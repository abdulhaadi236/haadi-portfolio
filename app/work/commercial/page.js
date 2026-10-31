import Link from 'next/link'

export const metadata = { title: 'Commercial Work' }

// Commercial work placeholder (Figma redesign, 2026-10-24)
export default function Commercial() {
  return (
    <main className="page centred">
      <div className="block-page">
        <h1 className="block-title in-production">
          <i className="block-title__square" aria-hidden="true" />
          <span>This page</span>
          <span>is in</span>
          <span>production</span>
        </h1>
        <Link href="/work/visual-arts" className="block-page__link">See visual arts work</Link>
      </div>
    </main>
  )
}
