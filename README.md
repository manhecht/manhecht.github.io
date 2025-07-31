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

### GitHub Pages Deployment for manhecht.github.io

Since your GitHub username is "manhecht", you can host this site at manhecht.github.io by following these steps:

#### Option 1: User Site (manhecht.github.io)

1. Create a GitHub repository named exactly `manhecht.github.io`
2. Push this repository to GitHub:
   ```
   git remote add origin https://github.com/manhecht/manhecht.github.io.git
   git branch -M main
   git push -u origin main
   ```
3. GitHub Pages is automatically enabled for repositories named `username.github.io`
4. Your site will be published at `https://manhecht.github.io/`

#### Option 2: Project Site (any repository name)

1. Create a GitHub repository with any name (e.g., `portfolio`)
2. Push this repository to GitHub:
   ```
   git remote add origin https://github.com/manhecht/portfolio.git
   git branch -M main
   git push -u origin main
   ```
3. Go to your repository on GitHub
4. Navigate to Settings > Pages
5. Under "Source", select "main" branch
6. Click Save
7. Your site will be published at `https://manhecht.github.io/portfolio/`

### Automatic Deployment to phpfriends Webserver

This repository is configured to automatically deploy to your phpfriends webserver whenever changes are pushed to the main branch. This is done using GitHub Actions and FTP deployment.

#### Setup Instructions

1. **Configure GitHub Repository Secrets:**
   - Go to your GitHub repository
   - Navigate to Settings > Secrets and variables > Actions
   - Add the following secrets:
     - `FTP_SERVER`: Your phpfriends FTP server address (e.g., `ftp.phpfriends.at`)
     - `FTP_USERNAME`: Your phpfriends FTP username
     - `FTP_PASSWORD`: Your phpfriends FTP password

2. **How It Works:**
   - When you push changes to the main branch, GitHub Actions will automatically:
     - Checkout your repository
     - Upload all files to your phpfriends webserver via FTP
     - Exclude unnecessary files like .git directories and node_modules

3. **Deployment Status:**
   - You can check the status of deployments in the "Actions" tab of your GitHub repository
   - Each deployment will show logs and any errors that occurred

4. **Customizing Deployment:**
   - The deployment configuration is in `.github/workflows/deploy.yml`
   - You can modify this file to change deployment settings, such as:
     - Which files to exclude from deployment
     - Which directory on the server to deploy to
     - Additional steps before or after deployment

This setup ensures that your website at manuelhecht.com is always up-to-date with the latest changes in your repository.

## License

© 2025 Manuel Hecht. All rights reserved.