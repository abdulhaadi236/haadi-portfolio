// https://haadih.netlify.app/robots.txt
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://haadih.netlify.app/sitemap.xml',
  }
}
