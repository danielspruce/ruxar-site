# Local usability and accessibility review — 2 November 2026

Scope: current local Ruxar site. Used Playwright browser locators and rendered DOM inspection, the frontend-design guidance, existing regression checks, and attempted Lighthouse 13.6.0. No deployment.

## Findings fixed

1. Game pages overrode muted text with rgb(106,127,158) on rgb(5,7,13), making the primary description visibly dimmer than article text. readability.css now consistently uses #b6c4d8 for muted text on the game-site pages.
2. The iZBOT 2 comparison note used an inline .72rem font (11.52px). Comparison notes now use 16px with 1.75 line height. Game taglines also use a readable system font at 16px.
3. The automatic review strip said keyboard focus would pause it, but its region lacked a focus target or a dedicated control. Added a focusable review region and Pause/Resume button with aria-controls and aria-pressed. Explicit pause persists across hover/focus changes. The control is hidden for reduced-motion users, whose review animation is already disabled.

## Browser verification

Available preview viewport: 788 CSS pixels. Homepage, blog listing, iZBOT 2, retry research article and Photomosaica had no document horizontal overflow. Both homepage game images loaded; no failed images were observed on the checked game/software pages. The blog listing exposes 20 article cards. The research article has one H1, one main landmark and 18px article paragraphs. RUXAR branding remained intact.

Playwright clicked Pause reviews and verified aria-pressed=true and animation-play-state=paused, then clicked Resume reviews and verified aria-pressed=false and animation-play-state=running. The review region has tabindex=0.

This is a focused inspection, not certification against WCAG. Phone-width layout, full keyboard focus trapping and screen-reader behaviour were not verified in a mobile viewport. Browser capability discovery exposed no viewport emulation; zoom shortcuts did not provide a narrower CSS viewport.

## Lighthouse limitation

Installed Lighthouse 13.6.0 and attempted a mobile performance/accessibility/best-practices/SEO audit against http://localhost:8765/ using the installed Edge browser. Chrome launcher failed waiting for the dynamic debugging port. No Lighthouse report or numeric scores were produced. Do not interpret the failure as a website performance failure. Field Core Web Vitals and production network performance remain unmeasured.

## Validation

Run node --test tests/site.test.cjs for the five existing script, JSON-LD, local link, Steam attribution, tracking and shared-header checks. The passing checks do not substitute for GA4 receipt, actual Steam purchases, real-device testing or a completed Lighthouse run.

## Next checks

Run Lighthouse/DevTools using a working Chrome or Edge debugging setup, then test 375px and 390px phone layouts, keyboard menu open/close/Escape/Tab behaviour and real-device text zoom. Compare production Core Web Vitals through Search Console when field data is available. Preserve the existing iZBOT identity; no further design overhaul was introduced in this pass.
