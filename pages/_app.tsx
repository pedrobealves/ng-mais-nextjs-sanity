import 'tailwindcss/tailwind.css'
import 'react-toastify/dist/ReactToastify.css'

import { Analytics } from '@vercel/analytics/react'
import { AppProps } from 'next/app'
import { Inter, Open_Sans } from 'next/font/google'
import { lazy, Suspense } from 'react'

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

const PreviewProvider = lazy(() => import('components/PreviewProvider'))
const VisualEditing = lazy(() => import('components/VisualEditing'))

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
        {draftMode && (
          <Suspense>
            <VisualEditing />
          </Suspense>
        )}
        <Analytics />
      </div>
    </>
  )
}
