# Abdul Haadi - Portfolio Website

A modern, minimal portfolio website for visual artist Abdul Haadi. Built with Next.js, React, and Tailwind CSS.

## Features

- ✨ Modern, minimal design with smooth animations
- 🎨 Custom color palette (Blue, Green, White, Black)
- 📱 Fully responsive design
- 🎬 Video background support (hero section)
- ⚡ Fast performance with Next.js
- 🚀 Easy deployment to Vercel

## Color Palette

- **Primary Blue**: `#0066FF`
- **Accent Green**: `#00CC66`
- **Dark**: `#000000`
- **Light**: `#FFFFFF`

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Clone or extract the project
2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to see the site

### Updating Content

#### Hero Video
To add your own video to the hero section, update `app/page.js`:
1. Replace the gradient overlay with:
```jsx
<video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
  <source src="/video.mp4" type="video/mp4" />
</video>
```
2. Place your video in the `public/` folder as `video.mp4`

#### Projects
Edit the `projects` array in `app/page.js` to add your work with:
- `title`: Project name
- `description`: Brief description
- `year`: Year completed
- `category`: Type of work
- `link`: Project URL (when ready)

#### Contact Information
Already set to:
- Email: `abdulhadi.tahir98@gmail.com`
- Phone: `+1 (804) 616-8110`

Update social links in the Contact section.

## Deployment to Vercel (Free)

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/haadi-portfolio.git
git push -u origin main
```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Select this repository
   - Click "Deploy"
   - Your site goes live instantly!

3. **Custom Domain** (optional):
   - In Vercel dashboard, go to Settings → Domains
   - Add your custom domain (~$12/year)

## Project Structure

```
haadi-portfolio/
├── app/
│   ├── layout.js          # Root layout
│   ├── page.js            # Main page with all sections
│   ├── globals.css        # Global styles
├── public/
│   └── video.mp4          # Your hero video (add here)
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS config
├── package.json
└── README.md
```

## Customization

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: '#0066FF',    // Blue
  accent: '#00CC66',     // Green
  dark: '#000000',
  light: '#FFFFFF',
}
```

### Modify Typography
Edit font sizes, weights in `app/page.js` and `globals.css`

### Add More Sections
Copy a section component in `app/page.js` and add to navigation

## Technologies

- **Next.js 14** - React framework
- **Tailwind CSS** - Utility-first styling
- **React 18** - UI library
- **Vercel** - Deployment platform

## Performance Tips

- Optimize images before adding
- Keep video file sizes small (compress MP4)
- Use Vercel's built-in image optimization

## Need Help?

- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)
- Tailwind Docs: [tailwindcss.com](https://tailwindcss.com)
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)

---

Ready to deploy? Follow the "Deployment to Vercel" section above!
