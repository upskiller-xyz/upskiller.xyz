# Phase 1 Plan — Research Content from Substack

## Group 1 — Constants and Types

1. Add the Substack feed URL to a single source (extend `social-links.json` with a `feedUrl`, or add a dedicated `research-source.json`) — no duplicated string literals
2. Confirm the existing `ResearchArticle` TypeScript type in `shared/types/` covers `title`, `description`, `imageUrl`, `date`, and an external `url` field; extend it if `url` is missing

## Group 2 — Fetcher Utility

3. Create `upskiller/src/lib/fetchResearchArticles.ts` exporting an async function that fetches the RSS feed, parses it (using `DOMParser` on `text/xml`; no new dependency), and returns `ResearchArticle[]`
4. Inside the fetcher, map RSS fields to `ResearchArticle` per the requirements doc (title, description stripped of HTML, link, pubDate, first image or default)
5. Wrap the whole fetcher in a module-level in-memory cache so repeat calls within the same session return the cached promise
6. On any failure (network, non-2xx, parse error, zero items), `console.warn` once and re-throw a typed error so callers can branch on it

## Group 3 — Fallback Loader

7. Create a small `loadResearchArticles` wrapper that calls the fetcher, catches its error, and returns `research.json` contents instead
8. Keep `research.json` as the canonical fallback — do not delete or empty it

## Group 4 — Home Section Integration

9. Update `upskiller/src/components/sections/ResearchSection.tsx` to call `loadResearchArticles` via `useEffect` + local state (mirror the pattern in `NewsCard.tsx`)
10. Render loading, error (fallback-rendered), and loaded states; keep the existing `InfoCard` layout unchanged
11. Wire each card's click handler to open the article's external `url` (no more empty `handleArticleClick` stub)

## Group 5 — `/research` Page Integration

12. Update `upskiller/src/components/pages/ResearchPage.tsx` to use the same `loadResearchArticles` loader
13. Replace the infinite-spinner behavior with explicit `loading`, `error`, and `loaded` states — reuse the `ErrorState` component already present in `components/loading/`
14. Remove the empty `handleArticleClick` stub; use the same external-link handler as the home section (extract to a shared helper if it appears in both files)

## Group 6 — Verify

15. Run `npm run lint` — must exit 0 with no warnings
16. Run `npm run build` — must complete without TypeScript errors
17. Run `npm run dev` and manually confirm:
    - Home `/` Research section shows the latest Substack posts
    - `/research` page shows the same articles
    - Clicking a card opens the Substack article in a new tab
    - Temporarily break the feed URL and confirm both surfaces fall back to `research.json` content without a visible error
18. Open DevTools Network and confirm navigating between `/` and `/research` does not refetch the feed within a single session
