import { Section } from 'components/Section'
import type { Post } from 'lib/sanity.queries'

import { Card } from './Card'

type PostProps = {
  posts: Post[]
}

export function HomeExtraList({ posts }: PostProps) {
  return (
    <Section.Root>
      <Section.Title>Extras</Section.Title>
      <Section.Container>
        <ul className="flex flex-col gap-4">
          {posts.map((post) => (
            <Card
              key={post._id}
              slug={post.slug}
              title={post.title}
              picture={post.coverImage}
            />
          ))}
        </ul>
      </Section.Container>
    </Section.Root>
  )
}
