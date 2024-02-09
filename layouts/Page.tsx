import IndexPageHead from 'components/IndexPageHead'
import { Settings } from 'lib/sanity.queries'

import Footer from './Footer'
import Header from './Header'

type PageProps = {
  children: React.ReactNode
  title: string
  settings: Settings
}

export function Page({ children, title, settings }: PageProps) {
  return (
    <>
      <IndexPageHead settings={settings} text={title} />
      <Header social={settings.social} level={2} />
      <main className="w-full md:pt-28 pt-32 px-4 mb-14">{children}</main>
      <Footer settings={settings} />
    </>
  )
}
