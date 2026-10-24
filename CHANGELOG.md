# Changelog

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
