import 'tailwindcss/tailwind.css'
import 'react-toastify/dist/ReactToastify.css'

import { VisualEditing } from '@sanity/visual-editing/next-pages-router'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
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

const PreviewProvider = dynamic(() => import('components/PreviewProvider'))

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  return (
    <>
      <div className={`${inter.variable} ${open_sans.variable} font-sans`}>
        {draftMode ? (
          <PreviewProvider token={token}>
            <Component {...pageProps} />
          </PreviewProvider>
        ) : (
          <Component {...pageProps} />
        )}
        {draftMode && <VisualEditing />}
        <Analytics />
        <SpeedInsights />
      </div>
    </>
  )
}
