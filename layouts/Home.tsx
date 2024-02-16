import Layout from 'components/BlogLayout'
import IndexPageHead from 'components/IndexPageHead'
import { MinimalGrid } from 'features/grid'
import { InputNewsletter } from 'features/newsletter'
import Footer from 'layouts/Footer'
import Header from 'layouts/Header'
import Sidebar from 'layouts/Sidebar'
import * as demo from 'lib/demo.data'
import type { Settings } from 'lib/sanity.queries'

export interface HomePageProps {
  preview?: boolean
  loading?: boolean
  settings: Settings
  hero: React.ReactNode
  main: React.ReactNode
  sidebar: React.ReactNode
}

export function Home({
  preview,
  loading,
  settings,
  hero,
  main,
  sidebar,
}: HomePageProps) {
  const { title = demo.title, social } = settings || {}
  return (
    <>
      <Layout preview={preview} loading={loading}>
        <Header title={title} social={social} hero={hero} level={1} />
        <main className="w-full p-2 mx-auto justify-center -m-14 gap-10 mb-20">
          <InputNewsletter />
          <section className="container grid-cols-12 grid justify-center lg:flex-nowrap flex-wrap mx-auto sm:gap-4 gap-2">
            <section className="flex flex-col w-full sm:gap-4 gap-2 lg:col-span-9 col-span-full ">
              {main}
            </section>
            <Sidebar>{sidebar}</Sidebar>
          </section>
        </main>
        <Footer settings={settings} />
      </Layout>
    </>
  )
}
