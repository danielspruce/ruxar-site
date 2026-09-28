# Accessibility audit — September 28, 2026

Scope: local site at http://127.0.0.1:8080/. Browser DOM checks covered the homepage, the 13 indexing-audit pages, both game pages, and the GameMaker pricing article (17 pages). Keyboard checks sampled the homepage mobile menu. Reflow checked at 320 CSS pixels. Contrast sampled seven representative page templates using computed opaque foreground/background colours.

This is a focused WCAG 2.2 AA-oriented review, not a conformance certification. No axe/Lighthouse scan or screen-reader session was run. Contrast sampling excludes translucent text, image/gradient backgrounds and some nested text; those need further manual measurement. No site code was changed by this audit.

## Prioritized findings

| Priority | Finding | Evidence and recommended change |
| --- | --- | --- |
| High | Low-contrast FAQ link on iZBOT page | `/games/izbot/`, the “iZBOT 2” link in the sequel FAQ: computed foreground rgb(0,0,238), background rgb(8,12,21), 12.48px text, contrast 2.08:1. WCAG 1.4.3 requires 4.5:1 for normal text. Give body/FAQ links an explicit accessible colour and retain an underline or equivalent non-colour cue. |
| High | Review strip has no pause control | Homepage `.reviews-track` scrolls on a 38-second infinite CSS animation, alongside other content. Only the menu button is present. Add a keyboard-operable pause/resume control or show static reviews. Reduced-motion CSS exists, but does not provide a general pause control for readers. See WCAG 2.2.2. |
| Medium | Press page overflows at 320px | Document scroll width measured 357px at a 320px viewport. Fact tables extend beyond the viewport; long Steam URL labels contribute. Wrap long links and let cells shrink, or use a stacked fact layout. Recheck at 320px and actual 400% browser zoom. See WCAG 1.4.10; simple label/value tables should not need page-wide sideways scrolling. |
| Medium | Fact labels lack table-header semantics | Both press fact tables use td for labels and values. Convert labels to th scope="row" (and adapt CSS), or use a description list. Table aria-labels identify the tables but not label/value relationships. See WCAG 1.3.1. |
| Improvement | Skip link exists only on homepage in sample | Other 16 sampled pages have main landmarks but no skip link. Add a consistently visible-on-focus “Skip to main content” link and a working target. Main landmarks already provide an assistive-technology bypass, so absence of a skip link alone is not classified as a definite WCAG failure. |
| Improvement | Blog index skips H2 | Cards are H3 immediately after the H1. Use H2 for article cards or add an appropriate H2 grouping. A skipped heading level alone is not automatically a WCAG failure, but a coherent outline aids navigation. |

## Checks that passed

- All 17 sampled pages have lang="en", one main landmark, no img elements missing the alt attribute, and no unnamed visible links/buttons under the DOM screening used.
- 16 of 17 pages had no document-level horizontal overflow at 320px. Press was the exception.
- Homepage mobile menu moves focus to Games; Shift+Tab reaches Close menu, then wraps to Get on Steam; Escape closes the menu, restores focus to Open menu, and resets aria-expanded to false.
- Shared CSS provides focus-visible outlines. Homepage has reduced-motion handling.
- Existing three site regression tests passed in the preceding local test run. These are not accessibility conformance tests.

## Remaining manual coverage

Verify image descriptions for usefulness, focus visibility over every background, all focus states at zoom, text spacing overrides, captions/transcripts on any media, and reading/navigation with NVDA or another screen reader. Inspect outline-only headings and translucent text separately for contrast. Test touch-target spacing before classifying small controls as WCAG 2.5.8 failures, since spacing exceptions may apply.

## References

- https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html
- https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
- https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html
- https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html
