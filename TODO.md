# TODO

## Add a "Brand Kit" section to Resources

Add a third card to the Resources section for Brand Kit content.

---

## Add scrolling to the News card

Enable scrolling within the News card so more news items can be displayed without expanding the card's footprint.

---

## Fetch Research section content from Substack API

Explore using the Substack API to dynamically fetch content for the two cards in the Research section. Investigate implementation options (RSS feed, public API endpoints, caching strategy) before making any code changes.

---

## Refresh top main navigation bar

Replace the current "glass" background with a solid color. Add an upward-moving icon hover animation to match the style of other buttons on the website.

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
