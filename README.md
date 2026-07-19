<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/upskiller-xyz/upskiller.xyz">
    <img src="https://upskiller-website.s3.fr-par.scw.cloud/upskiller/logo/upskiller_logo_RGB.svg" alt="Logo" height="100" >
  </a>

  <h3 align="center">Upskiller.xyz</h3>

  <p align="center">
    Modern web platform for architectural technology and building performance consulting
    <br />
    <a href="https://upskiller.xyz">View Live Site</a>
    ·
    <a href="https://github.com/upskiller-xyz/upskiller.xyz/issues">Report Bug</a>
    ·
    <a href="https://github.com/upskiller-xyz/upskiller.xyz/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#local-assets-setup">Local Assets Setup</a></li>
      </ul>
    </li>
    <li><a href="#development">Development</a>
      <ul>
        <li><a href="#running-the-development-server">Running the Development Server</a></li>
        <li><a href="#building-for-production">Building for Production</a></li>
        <li><a href="#deployment">Deployment</a></li>
      </ul>
    </li>
    <li><a href="#architecture">Architecture</a>
      <ul>
        <li><a href="#project-structure">Project Structure</a></li>
      </ul>
    </li>
    <li><a href="#troubleshooting">Troubleshooting</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

![Upskiller Website](https://upskiller-website.s3.fr-par.scw.cloud/upskiller/images/upskiller_team_cyan.png)

This is the repository for the Upskiller website. It contains:

* **Interactive team showcase** with SVG-masked hover effects that reveal individual action images
* **Dynamic content system** loading team data, services, news, and partner information from cloud-hosted JSON
* **Modern single-page architecture** with smooth scrolling navigation and responsive design
* **Cloud-first asset management** with automatic local fallbacks for development
* **All components, hooks, utilities, and styling** to make the interactive features work seamlessly

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![React][React.js]][React-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![Vite][Vite]][Vite-url]
* [![Tailwind CSS][TailwindCSS]][TailwindCSS-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Follow these steps to set up the project locally for development.

### Prerequisites

* **Node.js** (v18.17.0 or higher)
* **npm** (comes with Node.js)
* **Git**

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/upskiller-xyz/upskiller.xyz.git
   cd upskiller.xyz
   ```

2. **Install dependencies** (npm workspaces — always install from the repo root)
   ```sh
   npm install
   ```

3. **Navigate to the website directory** (for the asset setup below)
   ```sh
   cd upskiller
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Local Assets Setup

For full functionality in local development, you need to download dynamic JSON files and image assets. This is required due to CORS restrictions when fetching from cloud storage.

#### **Required Dynamic JSON Files**

Create the dynamic folder and download JSON files:

```bash
# Create the dynamic folder
mkdir -p public/dynamic

# Download these files from cloud storage to public/dynamic/:
# - team.json          (Team member information)
# - products.json      (Product/service data)
# - resources.json     (Resource content)
# - partners.json      (Partner information)
# - news.json          (News and updates)
# - social-links.json  (Social media links)
```

#### **Required Image Assets**

For interactive team features:

```bash
# Create image folders
mkdir -p public/images
mkdir -p public/images/actions

# Download SVG mask files to public/images/:
# - mask_alejandro.svg
# - mask_christoph.svg
# - mask_libny.svg
# - mask_stasja.svg

# Download action images to public/images/actions/:
# - action_alejandro.png
# - action_christoph.png
# - action_libny.png
# - action_stasja.png
```

#### **Download Legal Documents**

For privacy/terms pages:

```bash
# These are loaded dynamically but need local copies for development:
# - privacy.md
# - tc.md (terms and conditions)
# - about.md
```

**✨ Automatic Fallback:** The application tries cloud assets first, then falls back to local files. This makes development resilient to network issues.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DEVELOPMENT -->
## Development

### Running the Development Server

```bash
# Start the development server
npm run dev
```

The site will be available at `http://localhost:5175/`

### Available Scripts

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`     | Start development server       |
| `npm run build`   | Build for production          |
| `npm run preview` | Preview production build      |
| `npm run lint`    | Check code quality            |

### Building for Production

```bash
# Build the application
npm run build

# Preview the build locally
npm run preview
```

### Deployment

The application is deployed using modern web hosting platforms. The build process creates static files that can be served from any CDN or static hosting service.

**Important:** Ensure all environment variables and asset URLs are configured for the production environment.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ARCHITECTURE -->
## Architecture

### Project Structure

```
upskiller.xyz/
├── upskiller/                     # Main website application
│   ├── src/
│   │   ├── components/            # React components
│   │   │   ├── navigation/        # Navigation components
│   │   │   ├── sections/          # Page sections (Hero, Team, etc.)
│   │   │   ├── sections-components/  # Section-specific components
│   │   │   │   └── team/          # Team interaction components
│   │   │   └── shared-components/ # Reusable components
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── utils/                 # Utility functions
│   │   │   └── AssetPathManager.ts # Centralized asset management
│   │   ├── constants/             # Application constants
│   │   ├── services/              # API services
│   │   ├── types/                 # TypeScript type definitions
│   │   └── styles/               # Global styles
│   ├── public/                    # Static assets
│   │   ├── dynamic/              # JSON data files (local fallback)
│   │   └── images/               # Images and SVG masks (local fallback)
│   ├── index.html                # HTML template
│   ├── package.json              # Dependencies and scripts
│   └── vite.config.ts            # Build configuration
├── shared/                       # Shared components (for future multi-site setup)
├── masks/                        # Generated SVG mask files
└── README.md                     # This documentation
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TROUBLESHOOTING -->
## Troubleshooting

### Common Issues

#### **"Missing dynamic content"**
**Symptoms:** Empty sections, infinite loading states
**Solution:**
```bash
# Check if required JSON files exist
ls public/dynamic/

# Download missing files from cloud storage
```

#### **"Team interactions not working"**
**Symptoms:** No hover effects on team image
**Solution:**
```bash
# Check if SVG masks exist
ls public/images/mask_*.svg

# Check browser console for loading errors
```

#### **"Port 5175 already in use"**
**Solution:** Vite will automatically use a different port, or kill the existing process

#### **CORS errors in development**
**Cause:** Browser security restrictions when fetching cloud assets
**Solution:** Use local fallback files as described in setup instructions

### Development Tips

1. **Clear browser cache** when testing asset changes
2. **Check browser console** for detailed error messages
3. **Use browser network tab** to debug asset loading
4. **Verify file paths** match exactly in public folder

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are welcome! This project follows modern React/TypeScript best practices.

### Development Guidelines

1. **Fork the Project**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Follow the code style**: Use existing patterns and conventions
4. **Test thoroughly**: Ensure all functionality works with both cloud and local assets
5. **Commit changes** (`git commit -m 'feat: add amazing feature'`)
6. **Push to branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### Code Standards

* Use **TypeScript** for all new code
* Follow **conventional commits** format
* Maintain **component separation** principles
* **Keep styling outside of TypeScript/TSX** - use CSS classes and Tailwind utilities
* Ensure **responsive design** on all screen sizes
* Test with **both cloud and local assets**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

**Upskiller Team**
- Website: [https://upskiller.xyz](https://upskiller.xyz)
- Email: [info@upskiller.xyz](mailto:info@upskiller.xyz)
- LinkedIn: [Upskiller](https://www.linkedin.com/company/upskiller-xyz/)

**Project Repository**: [https://github.com/upskiller-xyz/upskiller.xyz](https://github.com/upskiller-xyz/upskiller.xyz)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments

* [Best README template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/upskiller-xyz/upskiller.xyz.svg?style=for-the-badge
[contributors-url]: https://github.com/upskiller-xyz/upskiller.xyz/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/upskiller-xyz/upskiller.xyz.svg?style=for-the-badge
[forks-url]: https://github.com/upskiller-xyz/upskiller.xyz/network/members
[stars-shield]: https://img.shields.io/github/stars/upskiller-xyz/upskiller.xyz.svg?style=for-the-badge
[stars-url]: https://github.com/upskiller-xyz/upskiller.xyz/stargazers
[issues-shield]: https://img.shields.io/github/issues/upskiller-xyz/upskiller.xyz.svg?style=for-the-badge
[issues-url]: https://github.com/upskiller-xyz/upskiller.xyz/issues
[license-shield]: https://img.shields.io/github/license/upskiller-xyz/upskiller.xyz.svg?style=for-the-badge
[license-url]: https://github.com/upskiller-xyz/upskiller.xyz/blob/master/LICENSE
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/