/**
 * ThreeJS Background Scene for Manuel Hecht Portfolio
 * Creates an interactive, animated spherical environment mapping with wireframe visualization
 */

// Initialize ThreeJS scene
let scene, camera, renderer;
let sphere, innerSphere;
let mouseX = 0, mouseY = 0;
let normalizedMouseX = 0, normalizedMouseY = 0; // Normalized mouse position (-1 to 1)
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let clock = new THREE.Clock();
let targetRotationX = 0;
let targetRotationY = 0;
let currentRotationX = 0;
let currentRotationY = 0;
let mouseIntensity = 0; // Mouse movement intensity for melting effect

// Colors for the sphere - using a gradient from red to green with teal accents
const sphereColors = [
    0xff4d4d, // red
    0x64ffda, // teal/cyan
    0x4dff4d  // green
];

// Vertex shader for gradient effect with fluid/melting animation
const vertexShader = `
uniform float time;
uniform float mouseIntensity;
uniform vec2 mousePosition;
varying vec3 vPosition;
varying vec3 vOrigPosition;

// Simplex noise functions for fluid animation
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    // First corner
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    // Permutations
    i = mod289(i);
    vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        
    // Gradients: 7x7 points over a square, mapped onto an octahedron.
    float n_ = 0.142857142857; // 1.0/7.0
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    // Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

void main() {
    vOrigPosition = position;
    
    // Calculate distance from mouse position in normalized space
    float distToMouse = length(normalize(position.xz) - mousePosition);
    
    // Create melting effect based on noise and mouse position
    float noiseScale = 2.0;
    float noiseTime = time * 0.5;
    
    // Multiple layers of noise for more organic movement
    float noise1 = snoise(vec3(position.x * noiseScale * 0.5,
                              position.y * noiseScale * 0.5,
                              position.z * noiseScale * 0.5 + noiseTime)) * 0.5;
                              
    float noise2 = snoise(vec3(position.x * noiseScale * 1.0,
                              position.y * noiseScale * 1.0,
                              position.z * noiseScale * 1.0 + noiseTime * 0.7)) * 0.25;
                              
    float noise3 = snoise(vec3(position.x * noiseScale * 2.0,
                              position.y * noiseScale * 2.0,
                              position.z * noiseScale * 2.0 + noiseTime * 1.3)) * 0.125;
    
    // Combine noise layers
    float combinedNoise = noise1 + noise2 + noise3;
    
    // Apply mouse influence - stronger melting effect near mouse position
    float mouseEffect = (1.0 - min(distToMouse, 1.0)) * mouseIntensity;
    
    // Calculate displacement direction - slightly outward from sphere center
    vec3 displacementDir = normalize(position);
    
    // Apply displacement
    float displacementAmount = combinedNoise * 15.0 + mouseEffect * 20.0;
    vec3 displaced = position + displacementDir * displacementAmount;
    
    // Pass original position for color calculation
    vPosition = position;
    
    // Use displaced position for rendering
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
`;

// Fragment shader for gradient effect
const fragmentShader = `
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
varying vec3 vPosition;

void main() {
    // Normalize position to get values between -1 and 1
    vec3 pos = normalize(vPosition);
    
    // Create gradient based on position
    float t = (pos.y + 1.0) * 0.5; // Map from [-1,1] to [0,1]
    
    // Mix between the three colors based on position
    vec3 color;
    if (t < 0.5) {
        color = mix(color1, color2, t * 2.0);
    } else {
        color = mix(color2, color3, (t - 0.5) * 2.0);
    }
    
    // Add grid pattern
    float grid = 0.05;
    float line = 0.01;
    
    // Create grid lines based on spherical coordinates
    float phi = acos(pos.y);
    float theta = atan(pos.z, pos.x);
    
    // Normalize to [0,1]
    phi = phi / 3.14159;
    theta = (theta + 3.14159) / (2.0 * 3.14159);
    
    // Create grid pattern
    float phiLine = abs(mod(phi / grid, 1.0) - 0.5) < line / grid ? 1.0 : 0.0;
    float thetaLine = abs(mod(theta / grid, 1.0) - 0.5) < line / grid ? 1.0 : 0.0;
    
    // Combine grid lines
    float gridPattern = max(phiLine, thetaLine);
    
    // Apply grid to color
    color = mix(color, vec3(1.0), gridPattern * 0.5);
    
    gl_FragColor = vec4(color, 1.0);
}
`;

init();
animate();

function init() {
    // Get the canvas element
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    // Create scene
    scene = new THREE.Scene();
    
    // Create camera with a wider field of view
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 800);
    camera.lookAt(0, 0, 0);
    
    // Create spherical environment
    createSpheres();
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Add event listeners
    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mousedown', onDocumentMouseDown);
    document.addEventListener('mouseup', onDocumentMouseUp);
    window.addEventListener('resize', onWindowResize);
}

// Track mouse down state for more intense melting effect
let isMouseDown = false;

function onDocumentMouseDown() {
    isMouseDown = true;
}

function onDocumentMouseUp() {
    isMouseDown = false;
}

function createSpheres() {
    // Create outer sphere with wireframe
    const sphereGeometry = new THREE.IcosahedronGeometry(300, 4);
    
    // Create shader material for gradient effect with fluid animation
    const shaderMaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            color1: { value: new THREE.Color(sphereColors[0]) },
            color2: { value: new THREE.Color(sphereColors[1]) },
            color3: { value: new THREE.Color(sphereColors[2]) },
            time: { value: 0.0 },
            mouseIntensity: { value: 0.0 },
            mousePosition: { value: new THREE.Vector2(0, 0) }
        },
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    
    // Create the sphere mesh
    sphere = new THREE.Mesh(sphereGeometry, shaderMaterial);
    scene.add(sphere);
    
    // Create inner sphere with different resolution and color
    const innerGeometry = new THREE.IcosahedronGeometry(250, 3);
    
    // Create shader material for inner sphere with fluid animation
    const innerMaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            color1: { value: new THREE.Color(sphereColors[2]) },
            color2: { value: new THREE.Color(sphereColors[1]) },
            color3: { value: new THREE.Color(sphereColors[0]) },
            time: { value: 0.0 },
            mouseIntensity: { value: 0.0 },
            mousePosition: { value: new THREE.Vector2(0, 0) }
        },
        wireframe: true,
        transparent: true,
        opacity: 0.4
    });
    
    // Create the inner sphere mesh
    innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerSphere);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    // Track mouse position for camera movement
    mouseX = (event.clientX - windowHalfX) * 0.05;
    mouseY = (event.clientY - windowHalfY) * 0.05;
    
    // Normalize mouse position to -1 to 1 range for shader
    normalizedMouseX = (event.clientX / window.innerWidth) * 2 - 1;
    normalizedMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Set target rotation based on mouse position
    targetRotationX = mouseY * 0.01;
    targetRotationY = mouseX * 0.01;
    
    // Gradually increase mouse intensity for fluid effect
    mouseIntensity = Math.min(mouseIntensity + 0.05, isMouseDown ? 1.0 : 0.5);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    // Get elapsed time for animation
    const time = clock.getElapsedTime() * 0.3;
    
    // Smoothly interpolate current rotation towards target rotation
    currentRotationX += (targetRotationX - currentRotationX) * 0.05;
    currentRotationY += (targetRotationY - currentRotationY) * 0.05;
    
    // Apply rotation to spheres
    sphere.rotation.x = currentRotationX + time * 0.1;
    sphere.rotation.y = currentRotationY + time * 0.15;
    
    // Rotate inner sphere in opposite direction for interesting effect
    innerSphere.rotation.x = -currentRotationX - time * 0.15;
    innerSphere.rotation.y = -currentRotationY - time * 0.1;
    
    // Gradually decrease mouse intensity when not moving
    mouseIntensity = Math.max(mouseIntensity - 0.01, 0);
    
    // Update shader uniforms for fluid animation
    if (sphere.material.uniforms) {
        sphere.material.uniforms.time.value = time;
        sphere.material.uniforms.mouseIntensity.value = mouseIntensity;
        sphere.material.uniforms.mousePosition.value = new THREE.Vector2(normalizedMouseX, normalizedMouseY);
    }
    
    if (innerSphere.material.uniforms) {
        innerSphere.material.uniforms.time.value = time * 1.2; // Slightly different timing for variation
        innerSphere.material.uniforms.mouseIntensity.value = mouseIntensity * 0.7; // Less intense effect
        innerSphere.material.uniforms.mousePosition.value = new THREE.Vector2(normalizedMouseX, normalizedMouseY);
    }
    
    // Render the scene
    renderer.render(scene, camera);
}