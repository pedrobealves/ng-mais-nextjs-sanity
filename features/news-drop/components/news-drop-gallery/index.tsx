import TitleSection from 'components/TitleSection'
import { Post } from 'lib/sanity.queries'
import Link from 'next/link'

import { Card } from './Card'
import Container from './Container'

export function NewsDrop({ news }: { news: Post[] }) {
  return (
    <Container>
      <TitleSection>TenseiDrop</TitleSection>
      <div className="grid w-full lg:grid-cols-4 md:grid-cols-3 [&>*:first-child]:lg:col-span-2 grid-cols-1 gap-6">
        {news.map((post) => (
          <Link href={`/news/${post.slug}`} key={post._id}>
            <Card.Root>
              <Card.Cover picture={post.coverImage} title={post.title} />
              <Card.Category category={post.category.title} />
              <Card.InfoContainer>
                <Card.Title title={post.title} subtitle={post.excerpt} />
                <Card.Date dateString={post.date} />
              </Card.InfoContainer>
            </Card.Root>
          </Link>
        ))}
      </div>
    </Container>
  )
}
