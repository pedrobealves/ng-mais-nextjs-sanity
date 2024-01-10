import TitleSection from 'components/TitleSection'
import { Post } from 'lib/sanity.queries'
import Link from 'next/link'
import { tv, VariantProps } from 'tailwind-variants'

import { Card } from './Card'
import Container from './Container'

type NewsDrop = {
  news: Post[]
} & VariantProps<typeof item>

const item = tv({
  base: 'grid w-full [&>*:first-child]:lg:col-span-2 grid-cols-1 gap-6',
  variants: {
    type: {
      post: 'lg:grid-cols-4 md:grid-cols-3',
      home: 'lg:grid-cols-3 md:grid-cols-2',
    },
  },
})

export function NewsDrop({ news, type }: NewsDrop) {
  return (
    <Container>
      <TitleSection>TenseiDrop</TitleSection>
      <div className={item({ type })}>
        {news.map((post, index) => (
          <Link href={`/${post._type}/${post.slug}`} key={post._id}>
            <Card.Root>
              <Card.Cover picture={post.coverImage} title={post.title} />
              {post.category && (
                <Card.Category category={post.category.title} />
              )}
              <Card.InfoContainer>
                <Card.Title
                  index={index}
                  title={post.title}
                  subtitle={post.excerpt}
                />
                <Card.Date dateString={post.date} />
              </Card.InfoContainer>
            </Card.Root>
          </Link>
        ))}
      </div>
    </Container>
  )
}
