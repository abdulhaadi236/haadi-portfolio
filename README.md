# Abdul Haadi — Portfolio

Portfolio site for Abdul Haadi, visual artist working in video and animation.
Live at https://haadih.netlify.app (deployed by Netlify from the `main` branch).

## Pages
| Route | Page |
|---|---|
| `/` | Home — looping DeeDar background video |
| `/about` | Bio, profile photo, resume download |
| `/work` | Choose Visual Arts or Commercial work |
| `/work/visual-arts` | Works list with thumbnail deck, linked to YouTube |
| `/work/commercial` | In production |
| `/contact` | Instagram and email |

## Develop
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (what Netlify runs)
```

Works and their YouTube links live in `app/data/works.js`; thumbnails in `public/images/work/` (original 1920px, named by slug) and `public/images/work/sm/` (1200px for phones).
Project notes: `CLAUDE.md`, `CHANGELOG.md`, `DECISIONS.md`.
