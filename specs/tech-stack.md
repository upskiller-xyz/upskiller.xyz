# Tech Stack

upskiller.xyz is a client-rendered React application served as static files behind nginx. There is no application server; all dynamic-looking content is JSON loaded at runtime from `public/dynamic/`.

## Core

| Layer | Choice | Rationale |
|---|---|---|
| Language | TypeScript | Type safety end-to-end across shared and app code |
| UI library | React 18 | Mature ecosystem, team familiarity, React Router v6 alignment |
| Bundler / dev server | Vite 5 | Fast HMR, minimal config, first-class TS + React support |
| Routing | react-router-dom v6 | Client-side routes for `/`, `/about`, `/privacy`, `/terms`, `/research` |
| Styling | Tailwind CSS v4 | Utility-first, no runtime cost, fast iteration on the design system |
| Content | JSON in `public/dynamic/` | Non-engineers can update copy without a deploy pipeline change |
| Markdown | `react-markdown` | Renders legal pages (`about.md`, `privacy.md`, `tc.md`) at runtime |

## Monorepo Layout

- `shared/` — cross-project components, fonts, styles, and TypeScript types
- `upskiller/` — the marketing site (this app)
- `lux/` — the LUX product surface (skeleton; see roadmap Phase 2)
- `@shared` path alias resolves to `../shared/` via `vite-tsconfig-paths`

### Multi-Site Architecture (decided in [#23](https://github.com/upskiller-xyz/upskiller.xyz/issues/23))

Each site (`upskiller/`, `lux/`, future `graph/`) is its own workspace deploying to its own subdomain, with its **own** `src/features/` — feature folders are app-internal (per bulletproof-react) and never live at the repo root. The per-site boundary is the package/deploy boundary; the per-feature boundary is app-internal.

Two tiers of "shared":

1. Root `shared/` (`@shared`) — the cross-site design system and primitives only (`SharedButton`, tokens, themes, fonts). Not a home for full features.
2. Each site's `src/components/` — pieces reused within that one site.

Promotion path: feature → site `components/` → root `shared/`.

**Cross-site features** (e.g. news, contact, footer): promote the reusable *pieces* to `shared/` and let each site compose its own thin feature from them — features stay app-local with zero cross-site coupling. Only escalate a feature to a shared package once it is demonstrably identical across ≥2 sites. Pairs with the npm-workspaces setup ([#32](https://github.com/upskiller-xyz/upskiller.xyz/issues/32)).

## Deployment

- **Docker** multi-stage build: Node for `npm run build`, nginx for serving the static `dist/`
- **nginx** configured via `nginx.conf` with SPA fallback to `index.html`
- No server-side rendering; no Node process in production

## Design System

All tokens live in `upskiller/src/styles/globals.css` (`:root` custom properties) and `shared/fonts/automate.css`. New components must reference these tokens — do not introduce new hex values without updating this section.

### Color Tokens

Defined on `:root` and consumed via `var(--color-*)`:

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#180057` | Brand purple — nav bg, hero/team/research-page bg, body text color |
| `--color-primary-light` | `#4e378a` | Secondary purple — bullet marks, Follow-Us heading, privacy header border |
| `--color-secondary` | `#00d67a` | Brand green — info-card bg, news-card bg, team content area |
| `--color-secondary-light` | `#99efca` | Pale green — `.section-secondary` bg, privacy page text |
| `--color-secondary-disabled` | `#33de95` | Muted green — `.info-card-button-wrapper.disabled`, `.team-tab-inactive` |
| `--color-accent` | `#00ff66` | Bright green — info-card button wrapper, contact-button icon |
| `--color-text-light` | `#f4fffa` | Off-white text for dark backgrounds |
| `--color-text-dark` | `#180057` | Text on light backgrounds (same value as primary) |
| `--color-follow-us` | `#4e378a` | Follow-Us heading (same value as primary-light) |
| `--color-gray-400` | `#9ca3af` | Muted text — footer copyright/links, research card meta |
| `--divider-on-dark` | `rgba(255,255,255,0.1)` | Hairline dividers on purple sections — nav bottom, research toolbar |
| `--overlay-on-dark-hover` | `rgba(255,255,255,0.1)` | Hover fill on transparent buttons over dark bg |
| `--border-on-dark` | `rgba(255,255,255,0.15)` | Default subtle border on purple sections — research sort button |
| `--border-on-dark-strong` | `rgba(255,255,255,0.3)` | Resting border for emphasized controls — research view-all, sort hover |
| `--border-on-dark-hover` | `rgba(255,255,255,0.6)` | Hover border emphasis on purple sections |

### Typography

- **Single family**: `var(--font-automate)` → `'AUTOMATE', system-ui, -apple-system, sans-serif`. AUTOMATE is self-hosted from `shared/fonts/` as `AUTOMATELight.woff` (weight 300) and `AUTOMATEBold.woff` (weight 700). There is no Inter or Poppins despite earlier documentation.
- **Weights**: `300` (body copy, paragraphs, team bio), `500` (buttons, subtitles, active tabs, research titles), `700` (all `h1`–`h6`, card titles, section headings).
- **Line height**: `1.2` for headings, `1.6` for body, `1.75` for long-form paragraphs (team, privacy).

**Size scale actually in use** (converge on these; avoid inventing new sizes):

| Size | rem / px | Where |
|---|---|---|
| XS | `10px` | News item date |
| SM | `0.8125rem` (13px) | Research card meta |
| SM | `0.875rem` (14px) | Buttons (sm), info-card subtitle, feature items, team socials, research category tab, loading text |
| Base | `1rem` (16px) | Buttons (md), research view-all |
| LG | `1.125rem` (18px) | Buttons (lg), team paragraph, research card title, research empty state |
| XL | `1.25rem` (20px) | Hero paragraph, section subtitle |
| 2XL | `1.875rem` (30px) / lh `2.25rem` | Info-card title, contact-us title |
| 3XL | `2.25rem` (36px) / lh `2.5rem` | Section title (mobile), featured research card title |
| 4XL | `3rem` (48px) | Hero title (mobile), section title (`lg`), research page title, support heading (`lg`) |
| 5XL | `3.75rem` (60px) | Hero title (`lg`) |

### Spacing

- **Base unit**: `--spacing: 0.25rem` (4px). Multiples appear via `calc(var(--spacing) * N)`, with `* 2` (0.5rem), `* 6` (1.5rem), `* 8` (2rem), and `* 16` (4rem) being the common ones.
- **Gap / padding scale**: `0.25`, `0.5`, `0.75`, `1`, `1.5`, `2`, `2.5`, `3`, `4rem`.
- **Section vertical rhythm**: `.section-container` uses `padding: 5rem 0` with `min-height: 100vh` and flex centering; `.section-header` has `margin-bottom: 4rem`.
- **Content max-widths**: `48rem` (section subtitles), `64rem` (team content inner), `72rem` (main `.section-content`, research page, nav container), `80rem` (support container).
- **Breakpoints**: `640px` (sm), `768px` (md), `1024px` (lg) — matching Tailwind defaults.

### Reusable Component Patterns

- `.section-container` + `.section-content` — full-viewport section shell used by every homepage section.
- `.section-primary` / `.section-secondary`, `.section-title-light` / `.section-title-dark`, `.section-subtitle-light` / `.section-subtitle-dark` — alternating theme pairs; every section picks one.
- `.info-card-*` — purple-on-green product/resource card with `.info-card-title`, `.info-card-subtitle`, `.info-card-content`, `.info-card-features`, `.info-card-button-area`.
- `.news-card-*` — scroll-within-card pattern for the news panel.
- `.research-card-*` + `.research-grid-3col` — research tile and its asymmetric 3-column grid (first child spans 2×2 on `lg`).
- `.btn-base` + `.btn-sm` / `.btn-md` / `.btn-lg` + variant (`.btn-contact`, `.btn-product`) + `.btn-enabled` / `.btn-disabled`.
- `.reveal` / `.reveal.is-visible` — IntersectionObserver-driven fade-up (respects `prefers-reduced-motion`).
- `.hero-element-visible` / `.hero-element-hidden` — sticky-hero slide-in state toggle.
- `.brand-color-filter` — SVG-to-brand-purple image filter, reused for monochrome partner logos.

### Motion

- **Durations**: `0.2s` (micro hover), `0.3s` (card lift, image crossfade), `0.7s` (hero element entry), `0.8s` (scroll reveal).
- **Easing**: `ease`, `ease-out` — no custom curves.
- **Signature hover**: `transform: translate(15px, -15px)` on `.info-card-button-wrapper` and `.contact-button` (lift-and-shift). Other hovers use `scale(1.1)` (social icons), `translateY(-4px)` (research card), or `opacity` shifts (partners, links).

## Tooling

- `npm run dev` — Vite dev server on port 8080
- `npm run build` — `tsc && vite build`
- `npm run lint` — ESLint with `@typescript-eslint`, `react-hooks`, `react-refresh` plugins; `--max-warnings 0`
- `npm run preview` — preview production build locally

## What We Are Not Using

- No SSR / Next.js — the content is static enough that client rendering is fine and cheaper to host
- No CMS — JSON files in-repo are the CMS; a visual editor is not worth the complexity at this size
- No state management library (Redux, Zustand) — component state and router state are sufficient
- No test framework yet — deferred until the first regression actually hurts us
