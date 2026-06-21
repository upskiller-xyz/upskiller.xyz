# Phase 1 Requirements — Research Content from Substack

## Scope

Replace the static `research.json` content with the latest posts from the Upskiller Substack, consumed via the public RSS feed. Both the homepage `ResearchSection` and the `/research` page must render the live content through the same fetcher. When the feed is unreachable, fall back to the existing `research.json` so the site never shows an empty Research section.

## Out of Scope

- No full article bodies rendered in-app — cards continue to link out to Substack
- No authenticated Substack API usage (no API key, no private posts)
- News section is unaffected; `news.json` stays the source of truth for news
- No build-time prefetch — runtime fetch is sufficient at current traffic

## Decisions

### Source: public RSS feed
Use the Substack RSS feed URL (e.g., `https://<publication>.substack.com/feed`) rather than any undocumented JSON endpoints. RSS is stable, public, and requires no auth.

### Fallback to `research.json`
The existing `upskiller/public/dynamic/research.json` is retained as the hard fallback. If the RSS fetch fails (network error, non-2xx, parse error), the UI shows the JSON content and logs a single warning. Users never see a broken or empty Research section.

### Shared fetcher, single network call
Both `ResearchSection` (home) and `ResearchPage` (`/research`) consume the same fetcher. The fetcher deduplicates in-flight requests and caches the parsed result in memory for the session so navigating between home and `/research` does not refetch.

### Normalize to the existing article shape
The fetcher returns items matching the current `ResearchArticle` type consumed by `InfoCard`. Mapping:
- RSS `<title>` → `title`
- RSS `<description>` (stripped of HTML) or first paragraph → `description`
- RSS `<link>` → external URL used by the card's click handler
- RSS `<pubDate>` → `date` (formatted for display)
- RSS `<enclosure>` or first `<img>` in content → `imageUrl` (fall back to a default when absent)

## Context

The Research section currently renders two hand-curated cards from `research.json`. The copy drifts from the Substack within weeks of any new post. The review findings on `feat/research-page` also note that cards show `cursor-pointer` but `handleArticleClick` is a stub — this phase is the natural moment to wire real navigation to the Substack URL.

This phase only moves the data source. Routing, deep-linking (`/research#<slug>`), and removing dead `ResearchCard` code are deferred to Phase 2.

## Stakeholder Notes

- **Libny** wants the site to reflect the Substack without a deploy — satisfied by runtime fetch
- **Reliability** — the site has already been seen stuck on "Loading…" when a fetch fails (`ResearchPage.tsx:22-32`); the fallback path must be tested, not theoretical
- **Substack URL** must come from `social-links.json` or a single constant, not hard-coded in two places
