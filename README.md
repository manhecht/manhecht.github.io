# Manuel Hecht Portfolio Website

A modern, responsive portfolio website for Manuel Hecht, showcasing creative computing and digital art projects.

## Features

- Responsive design that works on all devices
- Interactive ThreeJS background with ocean wave visualization
- Dynamic project display with filtering capabilities
- Detailed project pages with images and descriptions
- About page with skills and experience timeline
- Clean, modern UI with dark blue color scheme

## Technologies Used

- HTML5, CSS3, JavaScript
- ThreeJS for 3D background visualization
- Responsive design with CSS Grid and Flexbox
- Dynamic content loading with JavaScript
- GitHub Pages for hosting

## Project Structure

- `index.html` - Homepage with featured projects
- `projects.html` - All projects with filtering
- `about.html` - About page with skills and experience
- `imprint.html` - Legal information
- `styles/` - CSS stylesheets
- `js/` - JavaScript files
  - `three-scene.js` - ThreeJS background
  - `main.js` - Main JavaScript functionality
  - `projects.js` - Project data
- `images/` - Project images and assets

## Setup and Deployment

### Local Development

1. Clone the repository
2. Open `index.html` in a browser to view locally

### GitHub Pages Deployment

This site is configured to be hosted on GitHub Pages. To deploy:

1. Create a GitHub repository (e.g., `username.github.io` or any repository name)
2. Push this repository to GitHub:
   ```
   git remote add origin https://github.com/username/repository-name.git
   git branch -M main
   git push -u origin main
   ```
3. Go to your repository on GitHub
4. Navigate to Settings > Pages
5. Under "Source", select "main" branch
6. Click Save
7. Your site will be published at `https://username.github.io/repository-name/`

### Connecting Your Custom Domain (manuelhecht.com) from phpfriends

To connect your existing domain hosted at phpfriends to GitHub Pages:

1. **In your GitHub repository:**
   - Go to Settings > Pages
   - Under "Custom domain", enter `manuelhecht.com`
   - Check "Enforce HTTPS" (recommended)
   - Save the settings

2. **In your phpfriends DNS settings:**
   - Log in to your phpfriends control panel
   - Navigate to the DNS management section for manuelhecht.com
   - Add the following DNS records:
     
     **Option 1: Apex domain (manuelhecht.com)**
     Add these A records pointing to GitHub Pages' IP addresses:
     ```
     A    @    185.199.108.153
     A    @    185.199.109.153
     A    @    185.199.110.153
     A    @    185.199.111.153
     ```
     
     **Option 2: With www subdomain (www.manuelhecht.com)**
     Add a CNAME record:
     ```
     CNAME    www    username.github.io.
     ```
     (Replace 'username' with your GitHub username)

3. **Wait for DNS propagation:**
   - DNS changes can take up to 24-48 hours to fully propagate
   - You can check propagation using tools like [dnschecker.org](https://dnschecker.org)

4. **Verify your domain:**
   - GitHub will automatically verify your domain once DNS is properly configured
   - A green checkmark will appear in the GitHub Pages settings when successful

## License

© 2025 Manuel Hecht. All rights reserved.