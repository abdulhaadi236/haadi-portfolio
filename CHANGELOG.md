# Changelog

## 2026-10-31 — Glass back on Visual Arts
- Reverted "image starts below the nav" (it made the nav look like a white bar). Image runs under the glass again; nav words get a soft white glow on that page (computers) for readability over the dark image.

## 2026-10-31 — One glass nav; dark mode removed
- Nav uses the same clear frosted glass on every page (rgba(255,255,255,.08) + blur + faint bottom line); only text colour adapts (white over Home video / phone images, black elsewhere).
- Removed dark mode entirely (tokens, nav switch, no-flash script, dark theme-color). Site is light only, regardless of device setting.
- Visual Arts (computers): background image starts below the nav so nav text always sits on white.

## 2026-10-31 — Sharper work images
- Work thumbnails now use the user's 1920×1080 originals unchanged (`public/images/work/<slug>.jpg`) instead of 1200px q82 re-encodes, which looked soft at full-screen size. Phones get 1200px q90 copies (`public/images/work/sm/`) via srcset; the browser picks per screen.
- Visual Arts background only loads the selected work ±2 (and keeps loaded ones) instead of all 12 originals up front.
- Work page Display image uses the same srcset.

## 2026-10-31 — Nav animation, dark mode, work pages, looping dial
- Nav (Figma nav concept): each link has an accent mark — hover: 30×12 bar rises into the bottom of the nav and the word lifts 3px; click: bar shoots to full height; current page: widens to cover the word (text in --on-accent). Replaces the old half-outside square and the text-stroke current-page marker. Nav glass now Figma's rgba(247,247,247,.7).
- Dark mode (Figma Black-Version frames): #181818 background, white text, grey glass nav, blue accent #0014F9 replacing lime everywhere. Follows the device setting; small half-filled-circle switch in the nav remembers the choice (localStorage, applied before first paint — no flash).
- Visual Arts desktop: page background with the work image fading in from the right (alpha gradient), titles in the page text colour; phones keep the full image + tint + white titles + clear nav.
- Dial: complete loop (after the last work comes the first; always titles above and below), 16° per title (~65px near the middle), springy detent snap (0.32s overshoot). Wrapping titles jump across the hidden back.
- New work pages `/work/visual-arts/<slug>` (Figma Youtube Embed frame): YouTube embed (privacy-enhanced), Title/Medium/Duration, About Work, Display image (thumbnail until supplied). Clicking the selected dial title opens it. Text fields in `app/data/works.js` (medium, duration, about[], display). Added to sitemap.
- Fixed regression from v13: "in production" and Contact page styles had been deleted; restored.
- Local test driver kept in `.claude/tools/browse.mjs` (gitignored).

## 2026-10-31 — Full-screen thumbnail background on desktop
- Desktop now matches phones: selected work's thumbnail fills the screen (cross-fade, left-weighted dark tint), dial floats in front, vertically centred, titles at Figma's x=292; white titles, selected black on the lime bar. Right-hand thumbnail frame removed.
- Mouse wheel turns the dial anywhere on the page (page never scrolls here).
- Nav on /work/visual-arts uses the clear glass + white text style (same as Home), since it sits over imagery.

## 2026-10-31 — Dial on phones and tablets
- ≤1100px: replaced the thumbnail gallery with the dial. Selected work's thumbnail fills the screen (cross-fades, dark left-weighted tint); dial floats in front, vertically centred; titles white, selected black on the lime bar; lime square at the left gutter.
- Touch: swipe up/down on the dial = one title per 30px (with tick + square stretch); tap a title to bring it to the middle; tap the selected title to open the video. A swipe never counts as a tap.
- Dial controls grouped in `.work-list__control`; drags use window listeners (no pointer capture) so taps still reach titles. Page never scrolls on this route at any size.

## 2026-10-31 — Bigger drum, matched to thumbnail
- Drum radius 170 → 236.8px (8° per title) so, in perspective, its top/bottom edges land on the thumbnail's top/bottom (verified: 133–138 vs 137, 511–516 vs 512). Middle row, lime bar and square moved up 19.5px to the thumbnail's vertical centre (y=325).

## 2026-10-31 — 3D drum dial
- Titles now sit on a CSS 3D cylinder (radius 170px, 11° apart, perspective 900px from the titles' left edge): the selected title faces forward in the middle row; others tilt away and foreshorten towards the top/bottom; titles round the back are hidden. Turning rotates every title along the curve (0.18s snap). Near-middle spacing ≈ Figma's 33px. Blur + slight fade by distance kept.

## 2026-10-31 — Dial: no visible box edges
- Dial column got 24px of room each side (negative margins keep positions exact) so blur isn't clipped, and a 48px fade at top/bottom instead of a hard cut.

## 2026-10-31 — Work list as a dial (Figma redesign)
- Visual Arts list rebuilt from Figma frame 14:37: titles 16px, 33px apart, in a 375px dial (thumbnail height). Selected title fixed in the middle row over a lime bar (x=261, 247×30), others blur by distance (0/1/1.5/2/3/3.5/4/5px). Thumbnail 568×375 at x=580. Positions verified pixel-exact.
- Removed the 12-frame scroll-wheel animation (sprites deleted). Replaced by the lime square drag handle (x=213, 30×30) with Figma "Scroll" frame states: 30×57 dragging up (grows upward), 30×59 dragging down, springs back on release; short stretch pulse per wheel notch.
- Turn the dial: mouse wheel/trackpad (one title per notch + tick), drag the square (24px per title), click a non-selected title, or arrow keys. Clicking the selected title or thumbnail opens the video.
- Tablets/phones keep the gallery layout.

## 2026-10-31 — Back to scroll-wheel animation 1
- Switched back to `Icons/Icon-Animation` (first set), keeping the 72px height, ~55px clearance and feathered edges. Sprite rebuilt with ~2px transparent padding per frame (1320×192 → shown 495×72, 41.25px frames) so no sliver of a neighbouring frame shows at fractional sizes. Animation 2 sprite kept (`scroll-wheel-2.png`).

## 2026-10-31 — Scroll wheel refinements
- Wheel smaller (33×96 → 25×72), further left (55px clear of the lime marker), feathered top and bottom (mask fade).

## 2026-10-31 — Scroll wheel: left side, animation 2
- Wheel moved to the left of the titles (24px left of the lime marker), same height.
- Switched to `Icons/Icon-Animation-2` (frames 00–11) → `public/images/ui/scroll-wheel-2.png` (792×192, 184 KB), shown 33×96. First animation kept as `scroll-wheel.png` (swap = CSS url/size + WHEEL_W 51).

## 2026-10-31 — Scroll-wheel icon
- Added the user's 12-frame scroll-wheel animation (`Icons/Icon-Animation`) between the titles and thumbnail (desktop). Frames cropped and combined into one 1224×192 sprite (`public/images/ui/scroll-wheel.png`, 230 KB vs 7.4 MB of PNGs), shown at 51×96.
- Each step spins one revolution: down plays 2→12→1, up jumps to 12 and plays 12→1 (~0.2s).
- Wheel can be dragged: every 24px down/up = one title step (tick + spin). Mouse wheel over the icon also steps.
- Stepping logic shared by mouse wheel, trackpad and drag. When the pointer isn't over the list (dragging the icon), the top-row title becomes active.

## 2026-10-31 — Gear-step title scrolling + tick sound
- Desktop Visual Arts: page no longer scrolls; the titles column scrolls on its own in 65px steps (one title per mouse-wheel notch; trackpad: every 40px of movement), each step snapping in 140ms with a synthesised "tick" (Web Audio, `app/work/visual-arts/tick.js`, no audio file). Title under the pointer becomes active, so the thumbnail follows. Every title can reach the top (spacer); titles fade at top/bottom edges.
- Whole title row is hoverable (was text only).
- Thumbnail frame moved 60px right (x=644) and is no longer sticky (page doesn't scroll).
- Sound only plays after the visitor has clicked somewhere on the site (browser rule) — arriving via the Work page link counts.

## 2026-10-31 — Single cross-fading thumbnail
- Visual Arts list: replaced the 12-card pile with one 564×372 frame on the right (Figma position). Hovering a title cross-fades it (0.6s ease-in-out) to that work's thumbnail; frame is sticky while scrolling and links to the active work's video. Pile version preserved at tag `v12-new-thumbnails`.

## 2026-10-31 — New work thumbnails
- Re-processed thumbnails from `Pictures/Work-Thumbnails/` (10 replaced by the user; all now 1920×1080 sources → 1200px JPEG). Circus 3 taken from new `Circus 3.png.jpg`.
- `netlify.toml`: media cache shortened from 1 week to 1 hour + background revalidation, so replaced files with the same name appear quickly.

## 2026-10-31 — Bio date
- About: replaced "returns to Twelve Gates Arts … in November 2026" with a timeless line listing Twelve Gates Arts alongside the other venues. Icons folder confirmed not needed (unused, gitignored).

## 2026-10-31 — Second full review
- Fixed: About page scrolled sideways on mid-size screens (~1000px).
- Fixed: thumbnail pile cut off on shorter laptop screens — card size now follows viewport height (564×372 max).
- Tablet (700–1100px) Visual Arts gallery: two columns, aligned with the logo.
- Nav shows the current page (slightly heavier text, no width shift).
- In production page links onward to Visual Arts work (shared `.block-page` style with 404).
- Soft fade-in when a page opens (respects reduced motion).
- SEO: `sitemap.xml`, `robots.txt`, Person structured data (Instagram + YouTube @abdulhaadi236), theme colour, apple-touch icon.
- `netlify.toml`: 1-week browser caching for `/video/*` and `/images/*`.
- Preview config: `autoPort` on (port 3000 often taken by another local copy in ~/Desktop/haadi-portfolio).

## 2026-10-24 — Design + technical review
- Work deck: stack 10px steps; hovered card rises 320px (≈ full image) and returns to full size/sharpness.
- One lime accent everywhere (#C0FF65).
- Bio 14px → 15px for readability (long ~120-char lines).
- Work chooser: "Commercial Work" no longer overflows 768–900px screens.
- Phones/tablets (≤1100px): Visual Arts list becomes a gallery — 16:9 thumbnail above each title, all sharp, linked to YouTube (previously no thumbnails at all).
- Accessibility: hidden h1 on every page, visible keyboard focus, reduced-motion support; video has no PiP/cast overlays.
- SEO/sharing: title template, description, Open Graph + Twitter card (DeeDar still), metadataBase.
- Added lime-square favicon (`app/icon.svg`) and custom 404 page in block-title style.
- README rewritten. Production build verified clean (all routes static).

## 2026-10-24 — Redesigned Work chooser, In production, new Contact page
- Work chooser: "Visual / Arts / Work" and "Commercial / Work" (Montserrat 50px) each over a 200×172 lime block (#C0FF65); block springs 6px up-left on hover. Replaces the slate gradient bars.
- In production: "This page / is in / production" (54px medium) over a lime block.
- Contact page `/contact`: Insta @fromhaadi (instagram.com/fromhaadi) + email, 28px medium, over a lime block. Nav "Contact" now links here instead of mailto.
- Positions measured from the user's Figma exports (856px wide → scaled to 1440).

## 2026-10-24 — YouTube links
- All 12 works linked to their YouTube videos (titles + thumbnails, open in new tab). Links matched by YouTube video title; user's list had 13 entries with "Circus 2" duplicated.
- Pulled-up thumbnail stays up while the mouse travels onto it, so it can be clicked.

## 2026-10-24 — Review round 2 (partial)
- Nav hover square: 6px rise with springy overshoot (0.32s), quick fade-in — more tactile.
- Work deck: pile of discs — cards keep fixed slots in list order; hovering a title slides that card straight up out of the pile (top rises 170px above pile, lower part stays behind cards in front). Pile moved lower to make room.
- Pending (need Figma frames): redesigned Work chooser, redesigned "in production" page, new Contact page.

## 2026-10-23 — Review round 1
- Nav hover square: 25px, lower (more gap under text), rises 20px with 0.5s ease-in-out.
- Nav glass: clear frosted bar on Home; white frosted glass on all other pages.
- Download Resume text 28px → 20px.
- Work deck: all 12 thumbnails stacked in list order (fixed slots, smaller + blurrier with depth); hovered work glides to the front (0.8s ease-in-out), previous one returns to its slot.

## 2026-10-23 — Full redesign from Figma (branch `redesign`)
- New pages: Home (`/`), About (`/about`), Work chooser (`/work`), Visual Arts list (`/work/visual-arts`), Commercial "in production" (`/work/commercial`). Contact = mailto link.
- Shared nav (Figma "Nav", 55px, Montserrat): lime square rises from below on hover, half on / half below the bar.
- Home: DeeDar background loop (115s, last 2s dissolve into first 2s). 1080p HEVC 5.4MB / H.264 8.9MB; 720p HEVC 1.6MB / H.264 3.2MB.
- About: profile photo (Figma crop) + lime accent, bio, Download Resume (`public/documents/Abdul_Haadi_Resume.pdf`).
- Work chooser: slate bars → lime gradient + bottom blur on hover.
- Visual Arts list: 12 titles, hovered one sharp with lime square, others progressively blurred; 3-card thumbnail deck. Thumbnails resized to 1200px JPEG in `public/images/work/`.
- YouTube links: placeholders in `app/data/works.js` (Figma MCP rate-limited — links not yet read).
- Removed old chairs hero videos and old single-page layout.

## 2026-10-03 — Wider nav link spacing
- Desktop gap between work / about / contact: 48px → 80px (still centred).

## 2026-10-03 — Centred nav links
- work / about / contact centred in the top bar on desktop (phones: right-aligned next to logo).

## 2026-10-03 — Sharper video, slimmer nav
- Video now 1080p on screens ≥768px, 720p on phones; HEVC with H.264 fallback (4 files in `public/video/`). Replaces blurry 720p ~13MB version.
- Nav: 16px links, 18px logo, 64px bar (56px on phones). Figma positions kept (logo x=155, links x=513 at 1440).

## 2026-10-03 — Front page from Figma (Desktop - 1)
- Replaced nav with Figma frosted-glass bar: 94px, `rgba(21,0,255,0.5)` + `backdrop-filter: blur(30px)`, Inter 30px, logo "Haadi" + work/about/contact. Matches Figma positions within ~1px at 1440.
- Hero is now a full-screen looping background video (`public/video/hero-loop.mp4`, 20s, muted, 1280px, ~13MB) with poster image. Removed old "ABDUL HAADI / Explore Work" hero text (not in design).
- About / Work / Contact sections unchanged.

## 2026-10-03
- Set up local workflow: `.gitignore`, `.claude/launch.json` (local preview), `CLAUDE.md`, `DECISIONS.md`, `CHANGELOG.md`.
- Added `package-lock.json` for reproducible installs.
