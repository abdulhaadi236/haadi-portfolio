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
// height; on the current page it widens to cover the word. Plus a light/dark switch.
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
        <ThemeToggle />
      </div>
    </nav>
  )
}

// Switches between light and dark. Starts from the device setting; the choice is remembered.
// (The saved choice is applied before the page paints by the script in app/layout.js.)
function ThemeToggle() {
  const [theme, setTheme] = useState(null)

  useEffect(() => {
    const saved = document.documentElement.dataset.theme
    setTheme(saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {}
    setTheme(next)
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    />
  )
}
