// Sitemap for search engines — https://haadih.netlify.app/sitemap.xml
const BASE = 'https://haadih.netlify.app'
const ROUTES = ['', '/about', '/work', '/work/visual-arts', '/work/commercial', '/contact']

export default function sitemap() {
  return ROUTES.map((route) => ({ url: `${BASE}${route}`, lastModified: new Date() }))
}
