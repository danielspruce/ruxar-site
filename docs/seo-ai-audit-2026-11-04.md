# Ruxar SEO and AI search audit

Reviewed 4 November 2026, Australia/Sydney. Skills applied: seo-audit and ai-seo. Scope: all 30 non-redirect content pages in this repository, including iZBOT, iZBOT 2, the blog, free assets and Photomosaica. Not the external Steam site. Changes remain local.

## Assessment

No source-level indexing blocker was found. All 30 pages have a unique title and description, exactly one H1, a matching self-canonical and sitemap membership. Local robots.txt allows crawling and declares the sitemap. HTML, local target, JSON-LD syntax and Steam attribution checks pass. These checks establish source consistency, not indexing, rich-result eligibility or ranking.

The biggest remaining opportunities are trustworthy evidence, distinct article purposes and stronger first-hand examples. Adding more near-identical recommendation lists is a lower priority than making existing pages useful and accurate.

## Completed fixes

- Added a visible Daniel Spruce byline, linked to the existing About/developer biography, on 21 articles. The author was already declared in their source markup; the new text makes that attribution visible to readers. No credentials were invented.
- Added a contextual Photomosaica link in a separate software section on /more/. Before this change, the photo software page was in the sitemap but had no incoming links from the 30 audited content pages. It is now reachable in two clicks from the homepage.
- Updated sitemap dates for the substantively changed More page, blog listing and Celeste article. The new Super Meat Boy article already has a 4 November entry. Byline-only changes did not advance article publication or modification dates.
- Preserved the revised neutral Super Meat Boy article, including N++, VVVVVV and Electronic Super Joy. That work predates this audit and is not counted as a new audit fix.

## Prioritized findings

| Priority | Finding and evidence | Impact | Next action / status |
| --- | --- | --- | --- |
| High | Production crawling and indexing are unverified. Web retrieval failed for live robots, sitemap and game page; direct HTTP was denied by the execution environment's socket permissions. | Cannot establish origin status, X-Robots-Tag, redirects or Googlebot access. | Search Console URL Inspection live tests for home, both games, blog and a representative article. Review Pages and Sitemaps reports. A tool fetch failure is not evidence that Google is blocked. |
| High | /blog/posts/best-cheap-platformers-steam.html promises Steam games under $10, then mixes sale assumptions, unspecified regions, full prices and Celeste Classic on itch.io. | The page does not reliably satisfy its price/platform promise. | Refresh against dated store prices in one explicit currency, distinguish regular price from sale price, specify Shovel Knight edition, and place non-Steam games in a clearly separate bonus section. Alternatively retitle around games to watch during sales after revising the body and FAQ together. Do not label unverified prices current. |
| High | /blog/posts/how-long-to-beat-izbot.html presents 2–8 hours for most finishers, skill-level ranges and sequel estimates without a visible sample or method. | Numerical answers are easy for search assistants to repeat as facts. | Supply dated completion evidence with sample size and main-story/completionist definitions; otherwise clearly label the figures as developer estimates and remove population claims. |
| High | /blog/posts/why-hard-games-are-good-for-you.html claims general cognitive improvements, emotional regulation and transfer from difficult platformers without direct evidence for those broad claims. | Weakens reader trust and produces overconfident extractable answers. | Revise as a personal/design opinion, limit claims to what cited studies actually tested, and link the existing five-paper retry research synthesis. Keep causation and transfer limits visible. |
| Medium | Most authors were only named in JSON-LD, despite the existing developer biography. | Readers could not readily identify the writer or assess relevant experience. | Fixed: visible bylines on 21 articles link to /about/. |
| Medium | Photomosaica was an orphan in the local page graph. | Weak navigation and limited contextual discovery. | Fixed: /more/ now links to it as other software. |
| Medium | Genre lists overlap: best precision platformers, games like Celeste, cheap platformers and games like Super Meat Boy. | Possible intent overlap; actual keyword cannibalization is not established without query/page data. | Keep distinct jobs: genre overview, Celeste movement/story alternatives, verified budget choices, and fast-retry/checkpoint comparisons. Use Search Console to see whether multiple pages alternate for the same queries before merging anything. |
| Medium | The iZBOT speedrun guide gives general principles without an original timed route or annotated gameplay example. | Less information gain than a practical guide from the game's developer could offer. | Add a verified level route, inputs, common failure points and a video or screenshots with explanatory text. Do not invent movement tech or completion times. |
| Medium | /photomosaica/ says coming soon; its source SoftwareApplication Offer declares PreOrder with no price. | Availability could be misunderstood; markup syntax alone does not establish rich-result eligibility. | Confirm real release/purchase status before updating visible text and structured data. Do not infer that a preorder exists from coming-soon copy. |
| Low | 29 images across About, Press and both game pages lack explicit width/height attributes in the source inventory. | Possible layout-shift exposure, not a measured CLS failure; CSS may already reserve space. | Measure representative mobile layouts, then add verified dimensions or aspect ratios where needed. Avoid lazy-loading a largest-contentful hero image. |
| Low | More and free pixel art pages have brief copy. | Brevity alone is not an SEO defect; these are useful navigation/download destinations. | Improve only with real information, such as asset formats, dimensions and listing-specific licences. Do not pad to a word count. |

## AI search findings

The site's static HTML exposes product descriptions, comparison tables, FAQs and research without depending on client rendering. Existing source JSON-LD parses. The inventory's top-level schema type is null for @graph containers; that does not mean those pages lack schema. This audit did not run Google's rendered Rich Results Test or independently validate every schema property.

Existing evidence-led material is the strongest foundation: the historical iZBOT postmortem, the Steam achievement milestone article and the retry-research synthesis. Preserve their dates, source links, methodology and limitations. Their underlying evidence ledgers were located but not fully revalidated in this pass.

Google's AI search features use ordinary SEO foundations and do not require special AI files or markup. Missing llms.txt or an OKF bundle is not recorded as an indexing defect. No unsupported crawler policy changes, artificial statistics, new review scores or ranking guarantees were introduced.

For product answers, keep developer, supported platform, release date, movement mechanics and current availability consistent across the two game pages, About and Press. Keep current price and review totals delegated to Steam unless a dated snapshot is explicitly needed. Independent reviews and genuine player discussion remain different evidence from a developer-authored review; retain the existing ownership disclosures.

## Keyword and intent map

Editorial mapping, not measured search volume or ranking difficulty.

| Intended search | Preferred destination | Improvement |
| --- | --- | --- |
| iZBOT / iZBOT game | /games/izbot/ | Official gameplay, mechanics and Steam destination |
| iZBOT 2 | /games/izbot-2/ | Sequel facts and movement differences |
| games like Super Meat Boy / platformers with fast restarts | /blog/posts/games-like-super-meat-boy.html | Keep checkpoint/retry comparison central |
| games like Celeste | /blog/posts/games-like-celeste.html | Separate dash/movement, story and exploration preferences |
| best precision platformers on Steam | /blog/posts/best-precision-platformers-steam.html | Broad genre guide with consistent selection criteria |
| cheap platformers on Steam | /blog/posts/best-cheap-platformers-steam.html | Repair price promise with dated currency/edition evidence |
| how long to beat iZBOT | /blog/posts/how-long-to-beat-izbot.html | Evidence or explicitly qualified estimates |
| iZBOT speedrun guide | /blog/posts/izbot-speedrun-guide.html | Original validated route and footage |
| indie game development costs / iZBOT postmortem | /blog/posts/izbot-indie-game-postmortem.html | Preserve historical numbers and their context |
| free pixel art assets | /free-pixel-art/ | Listing-specific asset details and terms |
| photo mosaic software for Windows | /photomosaica/ | Confirm availability and show a reproducible output example |

## Validation and limits

Ran node --test tests/site.test.cjs: four checks pass. The existing global header test still fails at /free-pixel-art/ because it expects the literal text >RUXAR</a>, while that page uses a span to colour the X. The rendered brand text is RUXAR. This is an existing markup/test mismatch, not evidence of an SEO blocker; the brand styling was preserved.

The 30-page initial inventory is saved as seo-page-inventory-2026-11-04.csv and seo-audit-2026-11-04.json. Their link counts and depths describe the pre-fix snapshot. After the fix, Photomosaica has an incoming link from More. No missing local link targets or unparseable inline JSON-LD were found by the test suite.

Not measured: current Google index coverage, Search Console queries/clicks, backlinks, Core Web Vitals, mobile visual behaviour, live redirects/headers, AI citation rates and Steam purchase outcomes. Search retrieval surfaced Ruxar pages, but a site: query is not an exhaustive index report. The surfaced legacy www press PHP URL needs a real live/URL Inspection check before redirect remediation is proposed.

Next measurement: compare complete 28-day Search Console windows by query and page, then correlate landing pages with existing Steam outbound events. A Steam click is not a purchase. For AI visibility, use a fixed small query set with repeated runs and sample sizes; distinguish citation, mention and recommendation. No account connections, external posts or deployment were performed.

## Official guidance checked

- Google AI features: https://developers.google.com/search/docs/appearance/ai-features
- Titles: https://developers.google.com/search/docs/appearance/title-link
- Sitemaps and accurate modification dates: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
