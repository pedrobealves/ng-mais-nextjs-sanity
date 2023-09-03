import Container from 'components/BlogContainer'
import Layout from 'components/BlogLayout'
import IndexPageHead from 'components/IndexPageHead'
import { Logo } from 'components/Logo'
import { NewsDrop } from 'features/news-drop'
import Footer from 'layouts/Footer'
import Header from 'layouts/Header'
import * as demo from 'lib/demo.data'
import type { Post, Review, Settings } from 'lib/sanity.queries'

import { Hero } from './Hero'
import { NewsSection } from './News'
import { PostSection } from './Post'
import { Top } from './Top'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  posts: Post[]
  news: Post[]
  reviews: Post[]
  newsDrop: Post[]
  topGames: Review[]
  settings: Settings
}

export function HomePage(props: IndexPageProps) {
  const {
    preview,
    loading,
    news,
    reviews,
    posts,
    settings,
    newsDrop,
    topGames,
  } = props
  const [heroPost, ...morePosts] = posts || []
  const { title = demo.title, social } = settings || {}

  return (
    <>
      <IndexPageHead settings={settings} />
      <Layout preview={preview} loading={loading}>
        <Header
          title={title}
          social={social}
          hero={<Hero reviews={reviews} />}
          level={1}
        />
        <main className="w-full mx-auto justify-center -m-10 gap-10 px-4 mb-20">
          <section className="container mx-auto pb-10">
            <form
              action=""
              className="focus-within:ring-2 focus-within:ring-secundary-4 w-full flex justify-between rounded-full shadow-xl bg-white border max-w-col-6"
            >
              <input
                type="email"
                className="sm:flex-1 w-full outline-none rounded-full pl-8 pr-4 text-lg font-medium"
                placeholder=" Digite seu e-mail"
              />
              <button className="bg-secundary-4 text-white font-bold sm:px-9 px-5 py-5 rounded-full hover:bg-secundary-5 m-2">
                <p className="sm:block hidden">Inscreva-se</p>
                <p className="sm:hidden block">Ic</p>
              </button>
            </form>
          </section>
          <section className="container flex justify-center lg:flex-nowrap flex-wrap mx-auto gap-6">
            <section className="flex flex-col w-full max-w-col-9 gap-10">
              <NewsSection news={news} />
              <PostSection.Default posts={posts} />
              <NewsDrop news={news} type="home" />
            </section>
            <aside className="flex lg:flex-col flex-row sm:flex-nowrap flex-wrap lg:max-w-col-3 w-full border-l-2 border-l-gray-100 gap-10">
              <Top games={topGames} />
              <PostSection.Special posts={posts} />
            </aside>
          </section>
        </main>
        <Footer />
      </Layout>
    </>
  )
}
