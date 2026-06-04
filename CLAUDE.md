# CLAUDE.md — upskiller.xyz

Agent working instructions for this repo. **These instructions override default behavior — follow them exactly.**

For *what* we're building and *why*, read the specs — don't duplicate them here:

- [specs/mission.md](specs/mission.md) — what the product is and who it serves
- [specs/tech-stack.md](specs/tech-stack.md) — tech choices, deployment, and the **design system** (colors, typography, spacing, component patterns). This is the source of truth for design tokens.
- [specs/roadmap.md](specs/roadmap.md) — phased upcoming work
- `specs/<date>-<feature>/` — per-feature `requirements.md` → `plan.md` → `validation.md`

Design tokens themselves live on `:root` in `upskiller/src/styles/globals.css` and in `shared/fonts/automate.css`. Reference existing tokens — don't introduce new hex values without updating [specs/tech-stack.md](specs/tech-stack.md).

---

## Repo Layout

```
upskiller.xyz/
├── shared/        # Cross-project assets: SharedButton/SharedLink/ContactButton, fonts, shared.css, types
├── upskiller/     # Main company website (React app)
│   ├── public/
│   │   ├── dynamic/   # JSON content files (see table below)
│   │   ├── legal/     # Markdown legal pages (about, privacy, tc)
│   │   └── images/    # Static images
│   └── src/
│       ├── App.tsx                  # Router: /, /about, /privacy, /terms, /research
│       ├── components/
│       │   ├── sections/             # Page sections (Hero, Products, Research, Resources, Support, Team)
│       │   ├── sections-components/   # Section sub-components (info-card, news-card, news-panel, hero, partners, team)
│       │   ├── pages/                # Route pages (HomePage, AboutPage, PrivacyPage, TermsPage, ResearchPage)
│       │   ├── shared-components/     # Page-level reusables (Section, SectionTitle, PageHeader, PageFooter)
│       │   ├── shared-subcomponents/  # Smaller reusable pieces (ContactGrid, HeroTextGroup, TeamDetails, …)
│       │   ├── document-components/   # Markdown document rendering
│       │   ├── loading/              # Loading/error states
│       │   └── svg/                  # SVG icon components
│       └── styles/globals.css        # Design tokens (:root)
├── lux/           # LUX product surface (skeleton; see roadmap Phase 3)
├── Dockerfile     # Multi-stage Docker build
└── nginx.conf     # Production nginx config
```

`@shared` path alias resolves to `../shared/`.

## Dynamic Content

Site copy is JSON in `upskiller/public/dynamic/` so non-engineers can edit it without touching React:

| File | Purpose |
|---|---|
| `products.json` | Product cards (LUX LIVE for Revit, LUX LIVE for IFC) |
| `news.json` | News items |
| `research.json` | Research articles |
| `resources.json` | Resources cards |
| `team.json` / `team-story.json` | Team profiles and story narrative |
| `hero-texts.json` | Hero text variants |
| `contacts.json` / `social-links.json` / `partners.json` | Contact, social, and partner data |

---

## Development

```bash
cd upskiller
npm install
npm run dev      # dev server on localhost:8080
npm run build    # tsc + vite build
npm run lint     # ESLint (--max-warnings 0)
npm run preview  # preview production build
```

- **Before committing**, `npm run lint && npm run build` must pass.
- Build artifacts are gitignored — never commit `dist/` or compiled `.js` files.
- Import shared assets via the `@shared` alias.
- Keep pull requests scoped to a single feature or fix so they stay easy to review.

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
