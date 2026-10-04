# Changelog

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
