import 'tailwindcss/tailwind.css'
import 'react-toastify/dist/ReactToastify.css'

import { Inter, Open_Sans } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const open_sans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
})

export interface SharedPageProps {
  draftMode: boolean
  token: string
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${open_sans.variable} font-sans`}
    >
      <body>{children}</body>
    </html>
  )
}
