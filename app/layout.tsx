import 'tailwindcss/tailwind.css'
import 'react-toastify/dist/ReactToastify.css'

import { toPlainText } from '@portabletext/react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { readToken } from 'lib/sanity.api'
import { getClient, getSettings } from 'lib/sanity.client'
import { Metadata } from 'next'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { Inter, Open_Sans } from 'next/font/google'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity'

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
      <body>
        {children}
        {draftMode().isEnabled && <VisualEditing />}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const isDraftMode = await draftMode().isEnabled

  const client = getClient(isDraftMode ? { token: readToken } : undefined)

  const [{ title, description, social, ogImage }] = await Promise.all([
    getSettings(client),
  ])

  const ogImageTitle = ogImage?.title

  return {
    metadataBase: new URL('https://www.newgamemais.com/'),
    title: {
      template: `%s | ${title}`,
      default: title, // a default is required when creating a template
    },
    description: toPlainText(description),
    openGraph: {
      images: `${
        process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''
      }/api/og?${new URLSearchParams({ title: ogImageTitle })}`,
    },
    robots: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    icons: {
      shortcut: '/favicon/favicon.ico',
      icon: [
        {
          url: '/favicon/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          url: '/favicon/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png',
        },
      ],
      apple: [
        {
          url: '/favicon/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
        },
      ],
    },
    manifest: '/favicon/site.webmanifest',
    alternates: {
      types: {
        'application/rss+xml': `${process.env.VERCEL_URL}/feed`,
      },
    },
  }
}
