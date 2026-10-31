import { Montserrat } from 'next/font/google'
import SiteNav from './components/SiteNav'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})

const description = 'Visual artist working in video and animation, based between Lahore and Richmond, Virginia.'

export const metadata = {
  metadataBase: new URL('https://haadih.netlify.app'),
  title: {
    default: 'Abdul Haadi — Visual Artist',
    template: '%s — Abdul Haadi',
  },
  description,
  // Link previews when the site is shared (WhatsApp, iMessage, Instagram, etc.)
  openGraph: {
    type: 'website',
    siteName: 'Abdul Haadi',
    title: 'Abdul Haadi — Visual Artist',
    description,
    images: [{ url: '/video/deedar-poster.jpg', width: 1920, height: 1080, alt: 'Still from DeeDar' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#181818' },
  ],
}

// Applies a saved light/dark choice before the first paint, so the page never flashes the wrong theme
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t}catch(e){}`

// Tells search engines who the site is about (name, role, official profiles)
const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Abdul Haadi',
  jobTitle: 'Visual Artist',
  description,
  url: 'https://haadih.netlify.app',
  image: 'https://haadih.netlify.app/images/profile.jpg',
  sameAs: ['https://www.instagram.com/fromhaadi/', 'https://www.youtube.com/@abdulhaadi236'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={montserrat.className}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
        <SiteNav />
        {children}
      </body>
    </html>
  )
}
