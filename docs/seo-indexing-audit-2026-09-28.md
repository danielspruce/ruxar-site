# Indexing audit — September 28, 2026

Scope: the 13 URLs in the supplied Discovered - currently not indexed export. The export ends September 21; it is not a live indexing check.

## Findings

All 13 local pages have one H1, a title, a matching self-canonical, valid JSON-LD, no noindex directive, and sitemap entries. robots.txt allows crawling. All are linked from the site; none is an orphan. No local indexing blocker was found.

| URL | Result |
| --- | --- |
| https://ruxar.com/about/ | Local checks passed |
| https://ruxar.com/aiart/ | Local checks passed |
| https://ruxar.com/blog/ | Local checks passed |
| https://ruxar.com/blog/posts/best-cheap-platformers-steam.html | Local checks passed |
| https://ruxar.com/blog/posts/indie-platformer-dev-lessons.html | Local checks passed |
| https://ruxar.com/blog/posts/izbot-review.html | Local checks passed |
| https://ruxar.com/blog/posts/izbot-speedrun-guide.html | Local checks passed |
| https://ruxar.com/blog/posts/why-hard-games-are-good-for-you.html | Local checks passed |
| https://ruxar.com/gamemaker-sequences/ | Local checks passed |
| https://ruxar.com/how-to-make-animated-gifs/ | Local checks passed |
| https://ruxar.com/making-your-game-appealing-to-letsplayers/ | Local checks passed |
| https://ruxar.com/press/ | Local checks passed |
| https://ruxar.com/whats-in-a-name/ | Local checks passed |

## Changes

- Added relevant incoming article links to the budget platformer list, speedrun guide, and naming guide, each previously linked only from the blog index.
- Connected development lessons and GIF guidance to the streamer guide.
- Corrected Steam description-animation guidance in the GIF tutorial and matching FAQ schema; linked official Steamworks documentation.
- Corrected the streamer article’s reversed accessibility advice and inaccurate biannual Next Fest label.
- Corrected Sequence broadcast-message handling, moment events, and confusion between playback direction and looping mode; linked the official GameMaker manual.
- Fixed a broken sentence in the naming article and aligned the blog listing with the revised GameMaker pricing title.
- Updated sitemap lastmod for changed pages; retained original publication dates.

## Limits and next checks

Direct public HTTP requests returned 403 from this execution environment; initial sandbox requests were network-blocked. Web retrieval returned a mix of cached pages and fetch failures, including old WordPress content for About. These results cannot establish current origin status or Googlebot access. No hosting change was made on that evidence.

After deployment:
1. Use Search Console URL Inspection > Test live URL on Blog, About, Press, GameMaker Sequences, and the three previously weakly linked articles. Confirm successful fetch, indexing allowed, rendered content, and preferred canonical.
2. If Google also receives 403, inspect the host/CDN access controls and logs before changing any rules.
3. Confirm the deployed sitemap contains the updated modification dates, then request indexing for the most important corrected pages.
4. Recheck indexing after Google recrawls. Source fixes do not guarantee indexing.

## Content work requiring further evidence

The technical indexing audit does not verify all editorial claims. The budget article mixes current-price promises, sale prices, and a non-Steam bonus; it needs a separate store-by-store price/edition refresh. AI-art coverage contains dated tool and policy claims. First-person anecdotes and iZBOT-specific movement/Sequence claims need the developer’s source material or gameplay verification before a substantive rewrite. Avoid inventing examples merely to expand these articles.

## References

- https://support.google.com/webmasters/answer/7440203?hl=en
- https://partner.steamgames.com/doc/store/page/assets
- https://partner.steamgames.com/doc/marketing/upcoming_events/nextfest
- https://manual.gamemaker.io/lts/en/The_Asset_Editors/Sequence_Properties/Broadcast_Messages.htm
- https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Asset_Management/Rooms/Sequence_Layers/layer_sequence_headdir.htm
