# Roadmap

Phases are intentionally small — each one is a shippable slice of work, independently reviewable and testable.

Completed milestones (homepage, dynamic JSON content, legal pages, team and partners sections, standalone Research page) are not re-listed here. This roadmap covers upcoming work only.

---

## Phase 1 — Research article routing
- Clickable research cards navigate to a canonical destination (Substack URL or in-app detail page)
- `/research#<slug>` deep links from homepage `ResearchSection` scroll/highlight the correct card
- Remove dead `ResearchCard` component and CSS, or wire it in

## Phase 2 — npm workspaces + `/lux` project skeleton
- Root `package.json` with `workspaces: ["upskiller", "lux"]`
- Hoist React, Vite, Tailwind, TypeScript to the root `node_modules/`
- `/lux` project boots with a placeholder landing page
- Both `npm run dev -w upskiller` and `npm run dev -w lux` work end-to-end

## Phase 3 — Shared component extraction
- Move `SharedButton`, `SharedImage`, `SharedLink`, `ContactButton` consumers to import from `@shared`
- Promote `Section`, `SectionTitle`, `PageHeader`, `PageFooter` into `shared/components` where reuse is proven
- Document the `@shared` boundary in `CLAUDE.md`

## Phase 4 — LUX LIVE for IFC landing + waitlist
- `/lux` landing page with product overview
- Email capture form (backend TBD; likely a third-party form service)
- Distinct visual for LUX LIVE for IFC (replace the duplicated Revit `daylight.gif`)

## Phase 5 — News detail pages
- `/news/:slug` route rendering a single news item
- Markdown body support (reuse `react-markdown` setup from legal pages)
- `NewsCard` links to the detail page instead of an external URL when a detail page exists

## Phase 6 — Navigation correctness on non-home routes
- `Navigation` highlights the correct section when `location.pathname !== '/'`
- Research, News, and Team routes all show their own active state
- Homepage anchor scrolling continues to work unchanged

## Phase 7 — Accessibility pass
- Keyboard navigation audit across all routes
- Focus-visible styles everywhere interactive
- Color-contrast sweep against the purple/green palette
- Semantic-HTML review of section markup

## Phase 8 — Analytics + error telemetry
- Privacy-respecting analytics (Plausible or similar)
- Client-side error reporting for failed dynamic fetches
- Minimal dashboard or weekly digest for Libny

## Phase 9 — i18n groundwork
- Route-level language switch (en default, es as first translation)
- Extract user-facing strings from components into a single source
- Per-locale JSON for dynamic content under `public/dynamic/<lang>/`

---

Later phases (not yet planned): authenticated LUX LIVE account area, blog comments, case studies, partner co-marketing pages.

Dropped: fetching Research content from the Substack RSS feed — Substack API/feed access was not available, so `research.json` stays the source of truth for research cards.
