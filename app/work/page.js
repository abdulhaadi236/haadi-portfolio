import Link from 'next/link'

export const metadata = { title: 'Work — Abdul Haadi' }

// Work chooser (Figma: Work frame, node 14:65). Bars are the base colour;
// on hover they turn to the lime gradient with a soft blur along the bottom.
export default function Work() {
  return (
    <main className="page work-choice">
      <Link href="/work/visual-arts" className="work-choice__bar">
        <span>Visual Arts Work</span>
      </Link>
      <Link href="/work/commercial" className="work-choice__bar">
        <span>Commercial Work</span>
      </Link>
    </main>
  )
}
