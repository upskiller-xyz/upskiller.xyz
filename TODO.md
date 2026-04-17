# TODO

## Code review findings (feat/research-page)

### 🔴 High priority

- **SharedImage wrapper breaks hero motif + defaults `<button type="submit">`** — [shared/components/SharedImage.tsx:16-28](shared/components/SharedImage.tsx#L16-L28). New wrapper `<div>`/`<button>` is unsized, so `.hero-motif-image` and `.team-image` collapse against unsized parent. The `<button>` branch also has no `type`, risking form submission. Fix: forward `className` to the `<img>` (or apply a size-inheriting class to the wrapper) and add `type="button"` — or restore the wrapper-less render for the no-`onClick` case.

- **Research article clicks are dead** — [upskiller/src/components/pages/ResearchPage.tsx:40-45](upskiller/src/components/pages/ResearchPage.tsx#L40-L45). Homepage `ResearchSection.tsx:68` navigates to `/research#<slug>` but `ResearchPage` never reads `location.hash` and no article has a matching anchor. On `/research`, cards have `cursor-pointer` + `onClick` but `handleArticleClick` is an empty stub. Either wire real navigation (hash consumption + article routing, or link to canonical Substack URL) or drop the `cursor-pointer`/`onClick` until detail pages exist.

- **Duplicate LUX LIVE daylight icon + stale alt text** — [upskiller/public/dynamic/products.json:30-35](upskiller/public/dynamic/products.json#L30-L35). `LUX LIVE for IFC` uses the same `/images/daylight.gif` as Revit with stale `alt: "Coming soon icon"`. Update the alt text (e.g. "Daylight analysis animation" or "LUX LIVE for IFC preview"), and consider a distinct asset.

### 🟡 Medium priority

- **Research link never gets active styling on `/research`** — [upskiller/src/components/Navigation.tsx:18-25](upskiller/src/components/Navigation.tsx#L18-L25). Scroll handler uses `document.getElementById` for each `SectionId`, but those elements only exist on the homepage, so `activeSection` stays `'home'`. Fix by keying active section off `location.pathname` when not on `/` (e.g., set `activeSection='research'` whenever `pathname==='/research'`).

- **ResearchPage stuck on "Loading…" when fetch fails** — [upskiller/src/components/pages/ResearchPage.tsx:22-32](upskiller/src/components/pages/ResearchPage.tsx#L22-L32). Catch block only logs; `data` stays `null` so the spinner is infinite. Mirror `NewsCard.tsx` pattern — separate loading/error state + `ErrorState` component.

- **Dead `ResearchCard` component + CSS** — [upskiller/src/components/sections-components/research-card/ResearchCard.tsx:1-30](upskiller/src/components/sections-components/research-card/ResearchCard.tsx#L1-L30). The new `research-card/` directory (plus `.research-card*` classes in `globals.css`) is unreferenced — both `ResearchSection.tsx` and `pages/ResearchPage.tsx` render articles via `<InfoCard>`. Either wire `<ResearchCard>` in (dropping `InfoCard` reuse) or delete the directory and its CSS.

---

## Fetch Research section content from Substack API

Explore using the Substack API to dynamically fetch content for the two cards in the Research section. Investigate implementation options (RSS feed, public API endpoints, caching strategy) before making any code changes.

---

## Set up `/lux` project with npm workspaces

**Branch:** create a dedicated branch (not `feat/research-page`)

### Context

`/lux` will reuse components and logic from `/upskiller`. Both projects have nearly identical dependencies (React 18, Vite, Tailwind CSS v4, TypeScript). Rather than maintaining two separate `node_modules/` directories, use npm workspaces to hoist shared dependencies to the root.

### Steps

1. **Create a root `package.json`** with workspaces config:

   ```json
   {
     "name": "upskiller-xyz",
     "private": true,
     "workspaces": ["upskiller", "lux"]
   }
   ```

2. **Delete existing `node_modules/`** in both `upskiller/` and `lux/`

3. **Run `npm install` from the repo root** — dependencies get hoisted to a single root `node_modules/`

4. **Verify both projects** still build and run:
   - `npm run dev -w upskiller`
   - `npm run dev -w lux`

5. **Update `products.json`** with the LUX LIVE for IFC / LUX LIVE for Revit renaming (currently a pending change on `feat/research-page`)

### Notes

- Each project keeps its own `package.json` for project-specific deps (e.g., upskiller has `react-markdown`, lux doesn't)
- Shared components can be imported directly across projects instead of duplicating
- Single lockfile at the root becomes the source of truth for dependency versions
