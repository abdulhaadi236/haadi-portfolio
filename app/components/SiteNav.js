'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
]

// Top bar (Figma: Nav, 55px). Each link has an accent mark (Figma nav concept): on hover a small
// bar rises into the bottom of the nav and the word lifts; on click the bar shoots up to the full
// height; on the current page it widens to cover the word.
export default function SiteNav() {
  const pathname = usePathname()
  const [pressing, setPressing] = useState(null)

  // The new page has arrived — the "pressed" mark hands over to the active (locked) state
  useEffect(() => setPressing(null), [pathname])

  // Clear glass + white text over full-screen imagery: Home video always; Visual Arts on phones
  const onVideo = pathname === '/'
  const onImage = pathname === '/work/visual-arts'

  return (
    <nav className={`site-nav${onVideo ? ' site-nav--on-video' : ''}${onImage ? ' site-nav--on-image' : ''}`}>
      <Link href="/" className="site-nav__logo">Haadi</Link>
      <div className="site-nav__right">
        <div className="site-nav__links">
          {LINKS.map(({ href, label }) => {
            const active = pathname.startsWith(href)
            return (
              <Link
                key={label}
                href={href}
                className={`site-nav__link${active ? ' is-active' : ''}${pressing === href && !active ? ' is-pressing' : ''}`}
                aria-current={active ? 'page' : undefined}
                onClick={() => setPressing(href)}
              >
                <span>{label}</span>
                <i className="nav-mark" aria-hidden="true" />
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
