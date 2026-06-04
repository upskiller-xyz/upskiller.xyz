# CLAUDE.md — upskiller.xyz

Project instructions for Claude. This file is the source of truth for conventions, structure, and workflow.

## Project Overview

- **Repository**: upskiller.xyz
- **Purpose**: Multi-website platform — company site and product tools
- **Tech Stack**: React 18, TypeScript, Tailwind CSS v4, Vite 5, react-router-dom
- **Deployment**: Docker + nginx (static build)

---

## Project Structure

```
upskiller.xyz/
├── shared/                    # Cross-project reusable assets
│   ├── components/            # SharedButton, ContactButton, SharedLink, etc.
│   ├── fonts/                 # AUTOMATE font (woff)
│   ├── styles/shared.css      # Shared CSS
│   └── types/                 # Shared TypeScript types (button, contact, product, team, etc.)
├── upskiller/                 # Main company website
│   ├── public/
│   │   ├── dynamic/           # JSON data files (products, news, team, research, etc.)
│   │   ├── legal/             # Markdown legal pages (about, privacy, tc)
│   │   └── images/            # Static images
│   └── src/
│       ├── App.tsx            # Router: /, /privacy, /terms, /about, /research
│       ├── main.tsx           # Entry point
│       ├── components/
│       │   ├── Navigation.tsx
│       │   ├── sections/      # Page sections (Hero, Products, Research, Resources, Support, Team)
│       │   ├── sections-components/  # Section sub-components (info-card, news-card, news-panel, hero, footer, partners, team)
│       │   ├── pages/         # Route pages (HomePage, AboutPage, PrivacyPage, TermsPage, ResearchPage)
│       │   ├── shared-components/    # Reusable page-level components (Section, SectionTitle, PageHeader, PageFooter, ComponentGrid)
│       │   ├── shared-subcomponents/ # Smaller reusable pieces (ContactGrid, HeroTextGroup, TeamDetails, etc.)
│       │   ├── document-components/  # Markdown document rendering
│       │   ├── loading/       # Loading/error state components
│       │   └── svg/           # SVG icon components
│       └── styles/globals.css
├── Dockerfile                 # Multi-stage Docker build
├── nginx.conf                 # Production nginx config
└── CLAUDE.md                  # This file
```

## Dynamic Data

Content is driven by JSON files in `upskiller/public/dynamic/`:

| File              | Purpose                        |
|-------------------|--------------------------------|
| `products.json`   | Product cards (LUX LIVE for Revit, LUX LIVE for IFC) |
| `news.json`       | News items                     |
| `research.json`   | Research section content       |
| `resources.json`  | Resources section content      |
| `team.json`       | Team member profiles           |
| `team-story.json` | Team story narrative           |
| `hero-texts.json` | Hero section text variants     |
| `contacts.json`   | Contact information            |
| `partners.json`   | Partner logos/info              |
| `social-links.json` | Social media links           |

## Products

- **LUX LIVE for Revit** — Revit plugin for near-real-time daylight analysis (available)
- **LUX LIVE for IFC** — Web platform for daylight analysis of IFC models (upcoming)

---

## Development

```bash
# Setup
cd upskiller
npm install

# Development
npm run dev          # Start dev server (localhost:8080)
npm run build        # tsc + vite build
npm run lint         # ESLint
npm run preview      # Preview production build

# Quality checks before committing
npm run lint && npm run build
```

### Key Configuration

- **Dev server port**: 8080 (configured in `vite.config.ts`)
- **Shared imports**: Use `@shared` alias (resolves to `../shared/`)
- **Build artifacts**: gitignored — never commit `dist/` or compiled `.js` files

---

## Commit Message Conventions

Follow the Conventional Commits specification (https://conventionalcommits.org).

Format: `<type>(<optional scope>): <description>`

### Types

- `feat`: new functionality or visual changes the user can see
- `fix`: bug fixes, including visual/layout bugs
- `perf`: performance improvements
- `refactor`: restructuring without behavior or visual change
- `style`: code formatting only (whitespace, semicolons) — NOT visual design
- `docs`: documentation only
- `test`: adding or correcting tests
- `build`: build system or dependencies
- `ci`: CI/CD configuration
- `chore`: maintenance tasks that don't fit above

### Scopes for visual/design work

- `ui`: general visual changes (colors, typography, spacing, components)
- `layout`: structural changes (grid, flexbox, page structure, responsiveness)
- `design`: broader design system updates (theme, design tokens, brand)
- `a11y`: accessibility improvements (contrast, focus states, screen readers)

Examples:

- `feat(ui): add hover animation to product cards`
- `feat(layout): switch footer to three-column grid`
- `fix(ui): correct button alignment on mobile`
- `fix(a11y): increase contrast ratio on placeholder text`
- `refactor(ui): migrate inline styles to CSS modules`

### Rules

- Use imperative mood ("add" not "added")
- Do not capitalize the first word after the colon
- No period at the end of the description
- Keep the first line under 72 characters
- Add a body after a blank line for complex changes
- Mark breaking changes with `!` after the type or a `BREAKING CHANGE` footer

---

## Design System

- **Primary color**: Purple (#180057)
- **Secondary color**: Green (#00d67a)
- **Typography**: AUTOMATE — single self-hosted family (`var(--font-automate)`), `AUTOMATELight.woff` (300) and `AUTOMATEBold.woff` (700) from `shared/fonts/`. No Inter or Poppins.
- **Styling**: Tailwind CSS v4 utility-first approach

---

_This file is maintained to keep Claude context accurate across sessions._
