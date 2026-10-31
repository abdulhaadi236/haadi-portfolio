# Decisions

Record of choices and why, newest first.

## 2026-10-31 — Thumbnail interaction
- User preferred a single thumbnail with cross-fade over the pull-up pile. Tag `v12-new-thumbnails` has the pile if wanted again.

## 2026-10-24 — Block-title pages
- Designs came as PNG exports pasted in chat (Figma MCP still rate-limited). Measured lime blocks/text by pixel scanning, scaled ×1.682.
- Lime blocks always visible (Figma shows them static); added a small springy hover nudge on the Work chooser for feedback — confirm with user.
- Large-block lime is #C0FF65 (slightly different from the nav/list lime #CBFF63) — kept both as sampled.

## 2026-10-23 — Redesign build
- Figma Starter plan hit MCP limit after metadata + 2 screenshots. Layout taken from metadata (exact positions/sizes/text); colours sampled from screenshots (lime #CBFF63, slate #516E6F); font Montserrat (from screenshots).
- Nav hover square centred under each link (Figma showed it near the end of "Work"); hover-only, per user description.
- About bio split into paragraphs for readability (Figma has one text block).
- 10-bit HEVC rendered blank in the in-app browser despite canPlayType "probably" → use 8-bit HEVC Main; no visible banding at CRF 18.
- Work list blur disabled on touch screens (no hover there).
- Separate routes instead of one scrolling page, matching the separate Figma frames.

## 2026-10-03 — Video quality vs size; nav sizing
- User found 720p/CRF33 too blurry. Footage (dense particles) compresses poorly: 1080p needs ~30MB/20s for good quality.
  Chosen: 1080p HEVC CRF32 (28MB) / H.264 CRF30 (34MB); phones 720p HEVC CRF33 (14MB) / H.264 CRF30 (19MB). SSIM vs master ≈0.92–0.93 (old: 0.83).
  AV1 tested: no meaningful gain on this footage, dropped. Encodes made from a CRF10 1080p master of the 0:05–0:26 loop.
- Nav text/height deliberately smaller than Figma (user request: "standard website size").

## 2026-10-03 — Hero video & nav
- Design source: Figma file `J4gQYhBJRVQoV37zq005mt`, frame "Desktop - 1" (node 1:2). "Desktop - 2" (node 2:22) exists, not yet built.
- Video: source `Background Video/Basood Mukalma .mp4` (268MB, gitignored). Web loop = 0:05–0:26, last 1s crossfaded into first for a seamless loop; H.264 CRF 33, no audio. Re-encode command is in git history of this entry's commit.
- Nav blur: Figma MCP doesn't expose blur radius; 30px chosen by eye. Tune via `--nav-blur` in `app/globals.css`.
- Nav stays fixed on scroll (frosted over all sections).

## 2026-10-03 — Workflow setup
- Source of truth: GitHub repo `haadi-portfolio`; Netlify deploys from `main`.
- Local preview before every deploy; deploys only on explicit "deploy".
- Kept existing stack (Next.js 14 + plain CSS) for now. Candidate animation libs: GSAP + ScrollTrigger, Lenis, Motion — to decide when redesign starts.
