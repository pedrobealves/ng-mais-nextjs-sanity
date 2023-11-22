'use client'

import { HeadCard } from 'components/HeadCard'
import IndexPageHead from 'components/IndexPageHead'
import { CardList } from 'features/pagination'
import Footer from 'layouts/Footer'
import Header from 'layouts/Header'
import { readToken } from 'lib/sanity.api'
import {
  getClient,
  getDefaultPostsPagination,
  getSettings,
} from 'lib/sanity.client'
import { Post } from 'lib/sanity.queries'
import { defaultPostsPaginationQuery, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  settings: Settings
  initialPosts: Post[]
}

interface Query {
  [key: string]: string
}

const POSTS_IN_INDEX_PAGE = 8

export default function Search(props: PageProps) {
  const { settings, initialPosts } = props

  return (
    <>
      <IndexPageHead settings={settings} />
      <Header social={settings.social} level={2} />
      <main className="w-full md:pt-40 pt-32 px-4 mb-14">
        <section className="max-w-col-12 mx-auto">
          <HeadCard title="Matérias" />
          <CardList
            posts={initialPosts}
            type="post/default"
            pageQuery={defaultPostsPaginationQuery}
          />
        </section>
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [initialPosts = [], settings] = await Promise.all([
    getDefaultPostsPagination(client, 0, POSTS_IN_INDEX_PAGE),
    getSettings(client),
  ])

  return {
    props: {
      initialPosts,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
