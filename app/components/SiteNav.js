'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
  { href: 'mailto:abdulhadi.tahir98@gmail.com', label: 'Contact' },
]

// Top bar (Figma: Nav, 55px). On hover a lime square rises from below each link,
// sitting half on the bar and half below it.
export default function SiteNav() {
  const pathname = usePathname()
  const onVideo = pathname === '/'

  return (
    <nav className={`site-nav${onVideo ? ' site-nav--on-video' : ''}`}>
      <Link href="/" className="site-nav__logo">Haadi</Link>
      <div className="site-nav__links">
        {LINKS.map(({ href, label }) => {
          const active = href !== '/' && pathname.startsWith(href)
          return (
            <Link
              key={label}
              href={href}
              className={`site-nav__link${active ? ' is-active' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              <span>{label}</span>
              <i className="hover-square" aria-hidden="true" />
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
