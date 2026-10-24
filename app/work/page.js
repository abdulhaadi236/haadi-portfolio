import Link from 'next/link'

export const metadata = { title: 'Work' }

// Work chooser (Figma redesign, 2026-10-24): large stacked titles, each over a lime block.
export default function Work() {
  return (
    <main className="page work-choice">
      <h1 className="visually-hidden">Work</h1>
      <Link href="/work/visual-arts" className="block-title work-choice__item work-choice__item--visual">
        <i className="block-title__square" aria-hidden="true" />
        <span>Visual</span>
        <span>Arts</span>
        <span>Work</span>
      </Link>
      <Link href="/work/commercial" className="block-title work-choice__item work-choice__item--commercial">
        <i className="block-title__square" aria-hidden="true" />
        <span>Commercial</span>
        <span>Work</span>
      </Link>
    </main>
  )
}
