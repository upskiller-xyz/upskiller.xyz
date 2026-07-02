# Roadmap

Phases are intentionally small — each one is a shippable slice of work, independently reviewable and testable.

Completed milestones (homepage, dynamic JSON content, legal pages, team and partners sections, standalone Research page) are not re-listed here. This roadmap covers upcoming work only.

---

## Phase 1 — Research content from Substack
- Fetch latest Substack posts (RSS) at build or request time
- Normalize into the existing research-article shape
- Fall back to `research.json` when the feed is unreachable
- Home `ResearchSection` and `/research` both consume the same fetcher

## Phase 2 — Research article routing
- Clickable research cards navigate to a canonical destination (Substack URL or in-app detail page)
- `/research#<slug>` deep links from homepage `ResearchSection` scroll/highlight the correct card
- Remove dead `ResearchCard` component and CSS, or wire it in

## Phase 4 — Shared component extraction
- Move `SharedButton`, `SharedImage`, `SharedLink`, `ContactButton` consumers to import from `@shared`
- Promote `Section`, `SectionTitle`, `PageHeader`, `PageFooter` into `shared/components` where reuse is proven
- Document the `@shared` boundary in `CLAUDE.md`

## Phase 5 — LUX LIVE for IFC landing + waitlist
- `/lux` landing page with product overview
- Email capture form (backend TBD; likely a third-party form service)
- Distinct visual for LUX LIVE for IFC (replace the duplicated Revit `daylight.gif`)

## Phase 6 — News detail pages
- `/news/:slug` route rendering a single news item
- Markdown body support (reuse `react-markdown` setup from legal pages)
- `NewsCard` links to the detail page instead of an external URL when a detail page exists

## Phase 7 — Navigation correctness on non-home routes
- `Navigation` highlights the correct section when `location.pathname !== '/'`
- Research, News, and Team routes all show their own active state
- Homepage anchor scrolling continues to work unchanged

## Phase 8 — Accessibility pass
- Keyboard navigation audit across all routes
- Focus-visible styles everywhere interactive
- Color-contrast sweep against the purple/green palette
- Semantic-HTML review of section markup

## Phase 9 — Analytics + error telemetry
- Privacy-respecting analytics (Plausible or similar)
- Client-side error reporting for failed dynamic fetches
- Minimal dashboard or weekly digest for Libny

## Phase 10 — i18n groundwork
- Route-level language switch (en default, es as first translation)
- Extract user-facing strings from components into a single source
- Per-locale JSON for dynamic content under `public/dynamic/<lang>/`

---

Later phases (not yet planned): authenticated LUX LIVE account area, blog comments, case studies, partner co-marketing pages.
