/**
 * ThreeJS Background Scene for Manuel Hecht Portfolio
 * Creates an interactive, animated ocean wave background with wireframe visualization
 */

// Initialize ThreeJS scene
let scene, camera, renderer;
let ocean;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let clock = new THREE.Clock();

// Colors for the ocean - using the blue theme
const oceanColors = [
    0x4d91ff, // accent-secondary (medium blue)
    0x64ffda, // accent-primary (cyan)
    0xa855f7, // accent-tertiary (purple)
    0x77ddff  // light blue
];

init();
animate();

function init() {
    // Get the canvas element
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    // Create scene
    scene = new THREE.Scene();
    
    // Create camera with a wider field of view to see more of the ocean
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 400, 1000);
    camera.lookAt(0, 0, 0);
    
    // Create ocean waves
    createOcean();
    
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
    window.addEventListener('resize', onWindowResize);
}

function createOcean() {
    // Create a large plane for the ocean - reduced density
    const oceanGeometry = new THREE.PlaneGeometry(2000, 2000, 64, 64);
    
    // Rotate the plane to be horizontal
    oceanGeometry.rotateX(-Math.PI / 2);
    
    // Create wireframe material with the primary accent color
    const oceanMaterial = new THREE.MeshBasicMaterial({
        color: oceanColors[0],
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    
    // Create the ocean mesh
    ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
    scene.add(ocean);
    
    // Add just one additional ocean layer for depth effect
    addOceanLayers();
}

function addOceanLayers() {
    // Add just one more ocean layer with different size and color for depth
    const layerGeometry = new THREE.PlaneGeometry(1800, 1800, 48, 48);
    layerGeometry.rotateX(-Math.PI / 2);
    
    const layerMaterial = new THREE.MeshBasicMaterial({
        color: oceanColors[1],
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    
    const layer = new THREE.Mesh(layerGeometry, layerMaterial);
    layer.position.y = -40; // Position slightly below the main layer
    scene.add(layer);
}

function animateOcean() {
    // Get all ocean layers (all meshes in the scene)
    const oceanLayers = scene.children.filter(child => child instanceof THREE.Mesh);
    
    // Get elapsed time for wave animation - slower for more natural movement
    const time = clock.getElapsedTime() * 0.3;
    
    // Animate each ocean layer
    oceanLayers.forEach((layer, index) => {
        const geometry = layer.geometry;
        const positions = geometry.attributes.position;
        
        // Apply wave animation to each vertex
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const z = positions.getZ(i);
            
            // Create more natural wave pattern
            const distance = Math.sqrt(x * x + z * z) * 0.008;
            const waveHeight = 25 - index * 8; // Less height for deeper layer
            
            // Use Perlin-like noise approach for more natural ocean waves
            // Combine waves of different frequencies and amplitudes
            const y =
                Math.sin(distance + time * 0.5) * waveHeight * 0.5 +
                Math.cos(x * 0.02 + time * 0.3) * Math.sin(z * 0.02 + time * 0.2) * waveHeight * 0.3 +
                Math.sin(x * 0.01 + z * 0.01 + time * 0.7) * waveHeight * 0.2;
            
            // Update the vertex position
            positions.setY(i, y);
        }
        
        // Flag the geometry for update
        positions.needsUpdate = true;
        geometry.computeVertexNormals();
    });
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.05;
    mouseY = (event.clientY - windowHalfY) * 0.05;
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    // Animate the ocean waves
    animateOcean();
    
    // Rotate camera based on mouse position for parallax effect
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (400 - mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    // Render the scene
    renderer.render(scene, camera);
}