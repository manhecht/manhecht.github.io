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

1. **Configure GitHub Repository Secrets (Secure Credential Storage):**
   - Go to your GitHub repository (manhecht.github.io)
   - Navigate to Settings > Secrets and variables > Actions
   - Click on "New repository secret" and add the following secrets:
     - Name: `FTP_SERVER`
       Value: Your FTP server IP address
     - Name: `FTP_USERNAME`
       Value: Your FTP username
     - Name: `FTP_PASSWORD`
       Value: Your FTP password
   
   **Note:** The deployment is configured to use FTPS (FTP over SSL/TLS) for secure file transfers.
   This is required by your server and provides encrypted communication for better security.
   
   **IMPORTANT: Never store your actual credentials in the repository code or commit them to git!**
   GitHub Secrets provides encrypted storage specifically designed for sensitive information.
   
   **SECURITY NOTE: Never share your credentials in chat messages, emails, or other insecure channels.**
   If you've already shared credentials, consider changing them as soon as possible.

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

#### Security of GitHub Workflows

You might notice that the `.github/workflows/deploy.yml` file is committed to the repository and visible to anyone who has access to the repository. This is normal and secure because:

1. **No actual credentials are stored in the workflow file:**
   - The workflow file only contains references to secrets (e.g., `${{ secrets.FTP_SERVER }}`)
   - The actual values of these secrets are stored securely in GitHub's encrypted secrets storage
   - These values are only injected at runtime and are never exposed in logs or to unauthorized users

2. **GitHub Secrets are securely stored:**
   - GitHub Secrets are encrypted at rest
   - They are not accessible even to repository administrators after being set
   - They cannot be viewed or downloaded after being created
   - They can only be used by GitHub Actions workflows

3. **Workflow files need to be in the repository:**
   - GitHub Actions requires workflow files to be committed to the repository to function
   - This is by design and is secure as long as you follow best practices

The workflow file itself is just a configuration file that tells GitHub Actions what to do. It's like a recipe that says "use the secret ingredient" without actually containing the secret ingredient itself.

### Accessing Your phpfriends FTP Server

If you need to manually access your phpfriends FTP server, here are several methods:

#### Method 1: Using FileZilla (Recommended)

1. **Download and Install FileZilla:**
   - Download from [FileZilla's website](https://filezilla-project.org/)
   - Install following the on-screen instructions

2. **Connect to Your FTP Server:**
   - Open FileZilla
   - Enter the following details in the quickconnect bar:
     - Host: Your FTP server address (e.g., `ftp.phpfriends.at`)
     - Username: Your phpfriends FTP username
     - Password: Your phpfriends FTP password
     - Port: 21 (default FTP port)
   - Click "Quickconnect"

3. **Navigate and Transfer Files:**
   - Left panel: Your local files
   - Right panel: Server files
   - Drag and drop to transfer files between panels

#### Method 2: Using VS Code

1. **Install FTP Extension:**
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "FTP" and install "SFTP" by Natizyskunk

2. **Configure Connection:**
   - Press F1 to open the command palette
   - Type "SFTP: Config" and select it
   - Configure with your phpfriends details:
   ```json
   {
       "name": "phpfriends",
       "host": "your-ftp-server.phpfriends.at",
       "protocol": "ftp",
       "port": 21,
       "username": "your-username",
       "password": "your-password",
       "remotePath": "/",
       "uploadOnSave": false
   }
   ```

3. **Use FTP Commands:**
    - Right-click in Explorer to access SFTP commands
    - Upload/download files as needed

**SECURITY NOTE:** The configuration file will contain your password. Make sure to:
   - Add `.vscode` to your `.gitignore` file
   - Never commit the SFTP configuration file to your repository

#### Method 3: Using Command Line (Windows)

1. **Open Command Prompt**

2. **Connect to FTP Server:**
   ```
   ftp your-ftp-server.phpfriends.at
   ```

3. **Enter Credentials When Prompted:**
   - Username: Your phpfriends FTP username
   - Password: Your phpfriends FTP password

4. **Use FTP Commands:**
   - `dir` - List files
   - `cd directory-name` - Change directory
   - `get filename` - Download a file
   - `put filename` - Upload a file
   - `bye` - Disconnect

#### Method 4: Using Web Interface (if available)

phpfriends may provide a web-based file manager through your hosting control panel:

1. **Log in to phpfriends Control Panel**
2. **Look for "File Manager" or similar option**
3. **Navigate and manage files through the web interface**

**IMPORTANT SECURITY NOTES:**

1. **Never store credentials in your repository:**
   - Don't include FTP credentials in any files that are committed to git
   - Don't hardcode credentials in your code
   - Use GitHub Secrets for automated deployments
   - Use secure password managers for personal credential storage

2. **Use strong, unique passwords:**
   - Create a strong password for your FTP account
   - Don't reuse passwords from other services

3. **Consider using SFTP instead of FTP when available:**
   - SFTP (SSH File Transfer Protocol) provides encrypted connections
   - Standard FTP transmits data in plaintext

4. **Regularly update your credentials:**
   - Change your FTP password periodically
   - Update GitHub Secrets when credentials change

## License

© 2025 Manuel Hecht. All rights reserved.