export const metadata = { title: 'Contact' }

// Contact (Figma redesign, 2026-10-24)
export default function Contact() {
  return (
    <main className="page centred">
      <h1 className="visually-hidden">Contact</h1>
      <div className="block-title contact">
        <i className="block-title__square" aria-hidden="true" />
        <p>
          Insta :{' '}
          <a href="https://www.instagram.com/fromhaadi/" target="_blank" rel="noopener noreferrer">@fromhaadi</a>
        </p>
        <p>
          Email : <a href="mailto:abdulhadi.tahir98@gmail.com">abdulhadi.tahir98@gmail.com</a>
        </p>
      </div>
    </main>
  )
}
