# Phase 1 Validation — Research Content from Substack

## Definition of Done

All of the following must be true before this branch is merged.

### 1. Lint passes

```
npm run lint
```

Must exit with code 0 and zero warnings (`--max-warnings 0` is enforced).

### 2. Build passes

```
npm run build
```

Must complete with no TypeScript errors and produce a `dist/` directory.

### 3. Home Research section renders live Substack content

Start the dev server (`npm run dev`) and load `http://localhost:8080/`.

- The Research section shows cards whose titles match the latest posts on the Upskiller Substack.
- At least one card title differs from the previous `research.json` content (proves the RSS path is live).
- Each card is clickable; clicking opens the matching Substack URL in a new tab.

### 4. `/research` page renders the same content

Navigate to `http://localhost:8080/research`.

- The article list matches the homepage Research section (same titles, same order).
- No infinite "Loading…" state — the page reaches either a loaded state or the fallback state within a reasonable timeout.

### 5. Fallback path works

Temporarily point the Substack feed URL at an invalid host (e.g., `https://invalid.substack.example/feed`) and reload.

- Both the home Research section and `/research` render the contents of `research.json`.
- A single `console.warn` is logged; no uncaught errors.
- The UI is indistinguishable from a successful load other than the content source.

Revert the URL before merging.

### 6. No duplicate network requests across routes

With DevTools Network open, load `/` then navigate to `/research` without a full reload.

- Exactly one request to the Substack feed URL is recorded for the session.

### 7. Dead code removed from this phase's scope

- The empty `handleArticleClick` stub in `upskiller/src/components/pages/ResearchPage.tsx` is gone or replaced with a real external-link handler.
- No hard-coded Substack URL strings remain in component files — the URL is read from the single source defined in Group 1.

## Not Required

- No automated tests for the fetcher (test framework is not yet introduced; deferred to a later phase)
- No SSR or build-time prerender of the articles
- No changes to the News section, legal pages, or Team section
- Browser-matrix testing beyond the latest Chrome and Safari
