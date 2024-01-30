import { Section } from 'components/Section'
import { Post } from 'lib/sanity.queries'
import Link from 'next/link'
import { tv, VariantProps } from 'tailwind-variants'

import { Card } from './Card'
import Container from './Container'

type MinimalGridProps = {
  title: string
  news: Post[]
} & VariantProps<typeof item>

const item = tv({
  base: 'grid w-full [&>*:first-child]:lg:col-span-2 grid-cols-1 gap-4',
  variants: {
    type: {
      post: 'lg:grid-cols-4 md:grid-cols-3',
      home: 'lg:grid-cols-3 md:grid-cols-2',
    },
  },
})

export function MinimalGrid({ title, news, type }: MinimalGridProps) {
  return (
    <Section.Root className="items-start max-w-screen-xl mx-auto w-full">
      <Section.Title>{title}</Section.Title>
      <Section.Container>
        <div className={item({ type })}>
          {news.slice(0, 5).map((post, index) => (
            <Link href={`/${post._type}/${post.slug}`} key={post._id}>
              <Card.Root>
                <Card.Cover picture={post.coverImage} title={post.title} />
                {post.tag ? (
                  <Card.Category category={post.tag[0].title} />
                ) : (
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
      </Section.Container>
    </Section.Root>
  )
}
