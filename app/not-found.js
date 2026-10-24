import Link from 'next/link'

export const metadata = { title: 'Page not found' }

// 404, in the same block-title style as the In production page
export default function NotFound() {
  return (
    <main className="page centred">
      <div className="not-found">
        <h1 className="block-title in-production">
          <i className="block-title__square" aria-hidden="true" />
          <span>This page</span>
          <span>doesn’t</span>
          <span>exist</span>
        </h1>
        <Link href="/" className="not-found__home">Back to home</Link>
      </div>
    </main>
  )
}
