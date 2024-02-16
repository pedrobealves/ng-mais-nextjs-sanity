import { HeadCard } from 'components/HeadCard'
import { getPost } from 'features/pagination'
import { CardList } from 'features/pagination'
import { Page } from 'layouts/Page'
import { getAllPostsSlugs, getTitleBySlugs } from 'lib/sanity.client'
import { postsPaginationFilterQuery } from 'lib/sanity.queries'

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

export async function generateStaticParams() {
  const slugs = await getAllPostsSlugs('category')

  return slugs?.map(({ slug }) => `/${slug}`) || []
}
