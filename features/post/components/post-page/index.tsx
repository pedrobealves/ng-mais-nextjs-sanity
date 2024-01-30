'use client'

import { HeadCard } from 'components/HeadCard'
import IndexPageHead from 'components/IndexPageHead'
import { CardList } from 'features/pagination'
import Footer from 'layouts/Footer'
import Header from 'layouts/Header'
import { readToken } from 'lib/sanity.api'
import { getClient, getPostsPagination, getSettings } from 'lib/sanity.client'
import { Post } from 'lib/sanity.queries'
import { postsPaginationQuery, Settings } from 'lib/sanity.queries'
import type { SharedPageProps } from 'pages/_app'

export interface PageProps extends SharedPageProps {
  settings: Settings
  initialPosts: Post[]
  type: string
  title: string
  filter: string
  tag?: string
}

export interface Query {
  [key: string]: string
}

const POSTS_IN_INDEX_PAGE = 8

export function Page(props: PageProps) {
  const { settings, initialPosts, type, title, filter, tag = '' } = props

  return (
    <>
      <IndexPageHead settings={settings} />
      <Header social={settings.social} level={2} />
      <main className="w-full md:pt-28 pt-32 px-4 mb-14">
        <section className="max-w-col-12 mx-auto">
          <HeadCard title={title} />
          <CardList
            posts={initialPosts}
            type={`${type}${tag}`}
            pageQuery={postsPaginationQuery(type, filter)}
          />
        </section>
      </main>
      <Footer />
    </>
  )
}

// Função para obter o cliente
export function getClientWithToken(ctx: any) {
  const { draftMode = false } = ctx
  return getClient(draftMode ? { token: readToken } : undefined)
}

// Função para obter posts e configurações
export async function getPostsAndSettings(client: any, type: string) {
  return await Promise.all([
    getPostsPagination(client, 0, POSTS_IN_INDEX_PAGE, type),
    getSettings(client),
  ])
}
