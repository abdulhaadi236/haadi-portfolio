import './globals.css'

export const metadata = {
  title: 'Abdul Haadi - Visual Artist',
  description: 'Lahore-based visual artist exploring politics, land, and ecology through video and animation.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-light text-dark font-display overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
