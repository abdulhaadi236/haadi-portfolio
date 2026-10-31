# Changelog

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
