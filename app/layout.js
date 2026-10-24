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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <SiteNav />
        {children}
      </body>
    </html>
  )
}
