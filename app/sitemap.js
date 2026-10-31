// Sitemap for search engines — https://haadih.netlify.app/sitemap.xml
import { works } from './data/works'

const BASE = 'https://haadih.netlify.app'
const ROUTES = ['', '/about', '/work', '/work/visual-arts', '/work/commercial', '/contact']

export default function sitemap() {
  const pages = [...ROUTES, ...works.map((w) => `/work/visual-arts/${w.slug}`)]
  return pages.map((route) => ({ url: `${BASE}${route}`, lastModified: new Date() }))
}
