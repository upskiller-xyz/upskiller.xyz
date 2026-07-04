## [1.2.0] - 2026-07-04

### 🚀 Features

- Add animation linked to tabs to our image
- *(research)* Add research page and section with reusable components (#23)
- Add build workflow (#34)

### 🐛 Bug Fixes

- Change reference from info to about
- Clean trigger (#45)

### ⚙️ Miscellaneous Tasks

- Update readme
- Merge
- Pass SCW_DEFAULT_ORGANIZATION_ID to deploy step (#37)
- Fix Scaleway deploy step argument names and lookups (#38)
- Open changelog as PR to satisfy branch protection rules (#39)
## [1.1.0] - 2025-09-04

### 🚀 Features

- Initialize Company web application with basic structure and tool-01 feature
- Wrap App component in React.StrictMode for improved development checks
- Update web app manifest with new branding and icon paths
- Implement single-page scrolling website with modern design
- Replace website sections with new structure
- Implement tabbed interface for TeamSection
- Enhance TeamSection with detailed team narratives and improved member contact links
- Implement AUTOMATE font system for shared typography
- Update HeroSection content and remove unused favicon
- Redesign navigation bar and update hero section styling
- Implement enhanced team member profiles with detailed information
- Update all black text to use custom color #180057
- Update color scheme to use #f4fffa for light text
- Add SupportSection with partner logos between Hero and Team sections
- Add hover effect to SupportSection logo container
- Update title case in index.html and apply custom background colors in Products, Resources, and Team sections
- Enhance ProductsSection with interactive features
- Update ProductsSection and ResourcesSection styling and layout
- Enhance ResourcesSection social links and Follow Us styling
- Redesign TeamSection with team photo and improved styling
- Improve mobile responsiveness of navigation Contact button
- Add parallax SVG background animation to HeroSection
- Create shared InfoCard component and enhance SharedButton
- Add Substack link to Explore Blog button
- Create ContactButton component and update email address
- Implement ContactButton component with customizable props
- Add problem/solution to the project description
- Add scaleway deployment files
- Add scroll-driven animation to hero section
- Implement comprehensive SEO optimization
- Enhance UI interactions and fix component functionality
- Enhance product components with animated GIF and improved layout
- Implement News component with optimized typography and spacing
- Add clickable news titles with Guardian links
- Hide contact button text on iPhone screens
- Add cookie-banner
- Update social links
- Add terms, about, privacy endpoints

### 🐛 Bug Fixes

- Resolve blank page issue by adding package.json and moving index.html to root
- Remove compiled JS files that were shadowing TypeScript sources
- Ensure server port is explicitly set in Vite configuration
- Move image assets to the cloud
- Improve background image positioning and display
- Improve team section layout and content updates
- Change styles to comply!
- Move contact icons into social footer; fix: adjust mobile version

### 🚜 Refactor

- Rename product references to tool and update related files
- Clean up vite.config.ts and update package.json scripts
- Wrap header content in a header tag in App component
- Restructure project for shared components and simplified layout
- Rename my-sites to upskiller for better project naming
- Separate code into reusable components
- Modularize shared components
- Clean out js files
- Modularize shared components
- Add js files to ignore
- Fix the styles to comply with the original
- Separate newscard and infocard into components

### 📚 Documentation

- Add comprehensive README with step-by-step setup guide for new developers
- Improve README formatting and add missing line breaks for better readability
- Add CLAUDE.md development log for session continuity

### ⚙️ Miscellaneous Tasks

- Initialize package.json with dependencies and devDependencies for React and Vite setup
- Add comprehensive .gitignore and remove build artifacts
- Remove unused section components
- Consolidate gitignore files and clean up repository
- Add ESLint configuration and fix linting issues
- Language fixes
