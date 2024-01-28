import Layout from 'components/BlogLayout'
import IndexPageHead from 'components/IndexPageHead'
import { NewsDrop } from 'features/news-drop'
import { InputNewsletter } from 'features/newsletter'
import Footer from 'layouts/Footer'
import Header from 'layouts/Header'
import Sidebar from 'layouts/Sidebar'
import * as demo from 'lib/demo.data'
import type { Category, Post, Review, Settings } from 'lib/sanity.queries'

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
  category: Category[]
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
    category,
  } = props
  const { title = demo.title, social } = settings || {}
  return (
    <>
      <IndexPageHead settings={settings} />
      <Layout preview={preview} loading={loading}>
        <Header
          title={title}
          social={social}
          hero={<Hero posts={posts} reviews={reviews} />}
          level={1}
        />
        <main className="w-full mx-auto justify-center -m-14 gap-10 px-4 mb-20">
          <InputNewsletter />
          <section className="container flex justify-center lg:flex-nowrap flex-wrap mx-auto gap-6">
            <section className="flex flex-col w-full max-w-col-9 gap-10">
              <NewsSection news={news} categories={category} />
              <PostSection.Default posts={posts} />
              <NewsDrop news={newsDrop} type="home" />
            </section>
            <Sidebar>
              <Top games={topGames} />
              <PostSection.Special posts={posts} />
            </Sidebar>
          </section>
        </main>
        <Footer />
      </Layout>
    </>
  )
}
