# Abdul Haadi — Portfolio Website

Portfolio site for Abdul Haadi, visual artist.

## Stack
- Next.js 14 (App Router), React 18, plain CSS (`app/globals.css`), Montserrat via next/font
- Routes: `app/page.js` (home video), `app/about`, `app/work` (chooser), `app/work/visual-arts` (list, `WorkList.js`), `app/work/commercial`, `app/contact`, `app/not-found.js`. Shared nav: `app/components/SiteNav.js`. Work data + YouTube links: `app/data/works.js`.

## Where things live
- Local: `/Users/haadih/Desktop/Website`
- GitHub: https://github.com/abdulhaadi236/haadi-portfolio (branch `main`)
- Netlify site: `haadih` → https://haadih.netlify.app (site id `61716abf-9fd0-4f05-b9ff-141f3871b30c`) — linked to the GitHub repo (confirmed by user 2026-10-03), auto-deploys on push to `main`

## Workflow
1. **Iterate locally.** Preview with the `dev` config in `.claude/launch.json` (port 3000, or an auto-assigned port if taken — another copy lives in `~/Desktop/haadi-portfolio`).
2. **Every meaningful change = one git commit** with a clear message. Tag milestones (`git tag v1-…`).
   Risky/experimental work goes on a branch (`git switch -c try/<idea>`).
3. **Never push to `main` unless the user says "deploy".** Pushing `main` triggers the Netlify production deploy.
4. For a shareable preview before going live: push a branch → Netlify deploy preview URL.
5. After each session/decision, update `CHANGELOG.md` (what changed) and `DECISIONS.md` (why).

## Rolling back
- See history: `git log --oneline`
- Undo a change but keep history: `git revert <sha>`
- Look at an old version: `git switch --detach <sha-or-tag>`

## Environment notes
- Homebrew at `/opt/homebrew`; node/npm/gh are on PATH via `~/.zprofile` (use `zsh -lc` from non-login shells).
- GitHub CLI logged in as `abdulhaadi236`.
