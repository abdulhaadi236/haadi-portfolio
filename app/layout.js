import { Montserrat } from 'next/font/google'
import SiteNav from './components/SiteNav'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata = {
  title: 'Abdul Haadi — Visual Artist',
  description: 'Visual artist working in video and animation, based between Lahore and Richmond, Virginia.',
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
