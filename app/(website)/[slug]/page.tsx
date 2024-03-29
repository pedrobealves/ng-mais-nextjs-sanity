import { HeadCard } from 'components/HeadCard'
import { getPost } from 'features/pagination'
import { CardList } from 'features/pagination'
import { Page } from 'layouts/Page'
import { readToken } from 'lib/sanity.api'
import { getAllPostsSlugs, getClient, getTitleBySlugs } from 'lib/sanity.client'
import { postsPaginationFilterQuery } from 'lib/sanity.queries'
import { draftMode } from 'next/headers'

export default async function Pagination({ params }) {
  const {
    settings,
    initialPosts,
    type,
    title,
    filter,
    sub = '',
  } = await getPost(params, 'category')

  return (
    <Page title={title} settings={settings}>
      <section className="max-w-screen-xl mx-auto rounded-3xl bg-gray-200">
        <HeadCard title={title} />
        <CardList
          posts={initialPosts}
          type={`${sub}${type}`}
          pageQuery={postsPaginationFilterQuery(filter)}
        />
      </section>
    </Page>
  )
}
export const dynamicParams = true
export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const slugs = await getAllPostsSlugs('category')

  return slugs?.map(({ slug }) => `/${slug}`) || []
}

export async function generateMetadata({ params }) {
  const client = getClient(
    draftMode().isEnabled ? { token: readToken } : undefined,
  )

  const title = await getTitleBySlugs(client, params.slug)

  if (title && title.length > 0) {
    return {
      title: `${title?.charAt(0) + title?.slice(1).toLowerCase()}`,
    }
  }

  return {
    title,
  }
}
