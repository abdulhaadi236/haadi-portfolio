# Decisions

Record of choices and why, newest first.

## 2026-10-03 — Hero video & nav
- Design source: Figma file `J4gQYhBJRVQoV37zq005mt`, frame "Desktop - 1" (node 1:2). "Desktop - 2" (node 2:22) exists, not yet built.
- Video: source `Background Video/Basood Mukalma .mp4` (268MB, gitignored). Web loop = 0:05–0:26, last 1s crossfaded into first for a seamless loop; H.264 CRF 33, no audio. Re-encode command is in git history of this entry's commit.
- Nav blur: Figma MCP doesn't expose blur radius; 30px chosen by eye. Tune via `--nav-blur` in `app/globals.css`.
- Nav stays fixed on scroll (frosted over all sections).

## 2026-10-03 — Workflow setup
- Source of truth: GitHub repo `haadi-portfolio`; Netlify deploys from `main`.
- Local preview before every deploy; deploys only on explicit "deploy".
- Kept existing stack (Next.js 14 + plain CSS) for now. Candidate animation libs: GSAP + ScrollTrigger, Lenis, Motion — to decide when redesign starts.
