# Ruxar design, SEO, GEO and conversion audit

Reviewed: 2 November 2026 (Australia/Sydney). Scope: existing repository, public homepage, public iZBOT and IZBOT 2 Steam listings. Local changes only; no publication or Steam account changes.

## Skills installed and applied

- anthropics/skills: frontend-design
- coreyhaines31/marketingskills: seo-audit, cro, analytics, ai-seo, content-strategy
- GarrettPetersen/indie-game-marketing-skills: audit-steam-store-page
- Existing citable-content skill

Installed in the user's Codex skills directory. Automatic discovery refreshes on the next turn; this review read their installed instructions directly. Skills are guidance, not evidence that traffic or sales will increase.

## Diagnosis and completed fixes

The site already has static, extractable content, product pages, tagged Steam links, research references, and an accessible mobile menu implementation. The most obvious conversion friction was presentation: very small monospace reading text and navigation, outline-only headings, descriptions over darkened game images, and hover-dependent game links.

| Priority | Finding and evidence | Action |
| --- | --- | --- |
| High | Shared article body was .92rem and section headings .72rem. Homepage card paragraphs were .7rem. | Added readability.css after page-specific styles: system sans reading text, larger headings, 17–18px article paragraphs, larger navigation and labels. Display typography remains for game identity. |
| High | Homepage .gbody was absolutely positioned over darkened artwork, .gcta had opacity:0. | Descriptions now flow below artwork; images are undimmed; game links remain visible. Cards stack below 860px. |
| High | Research pages were in the blog listing but absent from homepage teasers. An older opinion teaser implied broad benefits from failure. | Featured the existing retry research and Steam completion milestone articles using their existing titles/descriptions. No new research claims. |
| Medium | Homepage headings used transparent fill and text strokes. | Solid text increases legibility. Hero text no longer waits for entrance animation. |
| Medium | Steam clicks were tracked, but internal movement toward a game was not. | Added game_page_click with game, source page path and destination path; retained steam_click and existing Steam UTMs. Internal tracking excludes query strings. |
| Medium | Homepage game images lacked explicit intrinsic dimensions. | Added 460×215 dimensions to reserve image space. Actual field CLS was not measured. |
| Medium | README required a minimum word count and described topic ideas as high-volume/easier-to-rank without supporting data. | Removed word-count target and marked demand/difficulty as unmeasured. |

## Design plan used

Preserve the supplied iZBOT identity rather than choose one of the six concepts without user selection. Existing palette: background #05070d, raised background #080c15, panel #0c1220, cyan #00f5c8, orange #ff5e1a, text #eef2f7. Orbitron remains the game display face; Segoe UI/Arial handles reading and controls. Homepage stays centred; articles and card descriptions stay left aligned. Separate artwork from reading surfaces and reserve decoration for game identity.

Layout: header → game identity + primary Steam action → game artwork above description → reviews → selected articles → footer. Long-form: title → direct answer → navigation → evidence and limitations → relevant game/reading links.

The first plan was reviewed against the existing brief: a wholesale visual replacement would assume the user's choice among six alternatives. This pass instead improves the existing theme and preserves current assets and structure. Photomosaica has a separate product identity and did not receive this game-site stylesheet.

## Technical SEO and GEO findings

Source inspection found 27 indexable content pages (excluding redirects, 404, templates and concept gallery). All have one H1, a canonical, unique title and sitemap membership. Existing inline JSON-LD parses in the automated suite. This verifies source consistency, not Google rich-result eligibility or indexing.

Local robots.txt allows crawling and references the sitemap. Public homepage content was retrievable. The web fetch tool could not retrieve the public robots.txt and sitemap.xml, so production status, headers and CDN crawler handling remain unverified; this is not evidence of a crawl block.

The existing retry article has a direct opening answer, primary-source links, explicit limitations and sources. The completion milestone article and historical postmortem offer stronger reference opportunities than generic unsubstantiated benefit claims. Their substantive evidence was not independently re-audited in this pass. Existing evidence ledgers remain in docs/. No publication dates were advanced to suggest a content refresh.

Google says no special AI file or schema is required for AI features: https://developers.google.com/search/docs/appearance/ai-features (checked 2026-11-02). No llms.txt, bot-policy changes, invented credentials, statistics or ranking guarantees were added.

## Content priorities

Editorial prioritisation; no keyword volumes or conversion data were available.

| Pillar / existing hub | Existing supporting content | Next useful work | Conversion path |
| --- | --- | --- | --- |
| Choosing a precision platformer: blog platformer guide | games-like-celeste, izbot-vs-izbot-2, both game pages | Refresh recommendations against actual gameplay and audience fit; avoid thin variations of the same list. | Guide → comparison → game page → Steam |
| Mastering iZBOT: game pages | speedrun guide, how-long-to-beat-izbot | Add original annotated routes or gameplay examples after validating them in the game. | Practical answer → gameplay → Steam |
| Behind the games: developer articles | postmortem, GameMaker Sequences, art commissions | Expand firsthand evidence and reproducible examples rather than generic advice. | Developer article → studio/about → relevant game |
| Challenge and player behaviour: retry research | completion milestone synthesis | Recheck source changes and definitions; preserve correlation/causation limits. | Research → genre guide → game page |

Refresh existing pages before expanding the library. Do not claim search demand, keyword difficulty, AI citations or traffic uplift until measured.

## Steam store audit: preliminary, read-only

Diagnosis: both public listings identify the precision platformer genre and link to Ruxar. Website visitors can reach a game-specific Steam page through tagged actions. The public text supports the broad game identity; source verification alone cannot establish the quality of the trailer, capsule at small size, or purchase conversion.

- Verified: both fetched listings name Ruxar as developer/publisher and show Precision Platformer among public tags.
- Improvement to investigate: the fetched IZBOT 2 listing includes Early Access among public user tags despite a release date being displayed. Confirm current status and intended audience signals in Steamworks before deciding whether this is misleading. User tags are not equivalent to publisher-controlled release status.
- High-impact next review: inspect first trailer opening, generated microtrailer and first screenshots in the actual Steam shopper interface. Not verified here; do not interpret this as a failed media audit.
- Unverified: capsule readability at actual display sizes, full trailer playback, current build/platform claims, supported-language implementation, Tag Wizard ordering, related-game neighbourhood, private UTM outcomes and purchases.
- Required evidence for a full audit: current capsule exports, gameplay trailer files or playback access, target-player/comparable-game notes, validated build feature list and Steamworks analytics exports.
- Recommendation: local website fixes are ready for review. No Steam store publish recommendation can be established from this limited text retrieval; keep current store assets pending media/build review. No store copy was authored or changed.

Current official references checked 2026-11-02:
- https://partner.steamgames.com/doc/store/trailer
- https://partner.steamgames.com/doc/marketing/utm_analytics

## Tracking and measurement handoff

Tools already present: GA4 gtag and Steam link UTMs. No analytics account or new third-party tracker was added.

| Event | Trigger | Properties | Decision |
| --- | --- | --- | --- |
| game_page_click (new) | Same-origin link to /games/izbot/ or /games/izbot-2/ | game, page, destination | Which entry pages help visitors explore a game? |
| steam_click (existing) | Link to store.steampowered.com | game, page, placement, link_url | Which game pages and placements send visits to Steam? |

Register event-scoped dimensions game, page, destination and placement as needed. Avoid registering full link_url as a high-cardinality custom dimension. Treat steam_click as an outbound-interest event, not a purchase. Configure key events and confirm live receipt in GA4 DebugView after deployment; source tests do not verify collection. Use Steamworks UTM Analytics for the outcomes it reports; browser clicks and Steam-attributed visits will not necessarily reconcile one-for-one.

Baseline still needed: last complete 28 days of Search Console landing-page/query data, GA4 page sessions and Steam clicks by source, and Steamworks UTM results over matching dates. Compare subsequent complete windows; annotate deployment date. Report session-based click rates with matching numerator/denominator windows. Count repeat click events separately from unique converting sessions. Track documented AI citations separately from AI referrals and crawler visits.

Suggested experiment after a baseline: authentic gameplay image in the homepage hero versus the current logo-led hero, holding the CTA and copy constant. Hypothesis: gameplay helps new visitors recognise the game sooner. Measure session-based Steam click-through and downstream Steam-attributed outcomes; do not call a winner without sufficient data.

## Validation and remaining limits

- node --test tests/site.test.cjs: 4 passing tests, including scripts/JSON-LD parsing, local link existence, Steam attribution, existing tracker behaviour and the new internal game-click regression test.
- Browser inspected homepage, separated game card content and research article reading layout at the available preview width. A local screenshot is provided in the chat.
- Dedicated mobile viewport/keyboard walkthrough, PageSpeed/field Core Web Vitals, Search Console coverage, GA4 receipt and full Steam media playback were not verified.
- No measured conversion, ranking or AI-citation improvement is claimed.
- Local modifications are uncommitted and unpublished. The earlier six-design gallery remains separate.

Next refresh: after production deployment and a complete observation window, or sooner if source content, Steam positioning, assets or platform documentation changes. No recurring monitor was created.
