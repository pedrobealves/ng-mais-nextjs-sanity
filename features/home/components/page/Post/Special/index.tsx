import type { Post } from 'lib/sanity.queries'

import { Card } from './Card'

type PostProps = {
  posts: Post[]
}

export function SpecialPostSection({ posts }: PostProps) {
  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex justify-start items-center gap-4">
        <div className="w-2 h-9 bg-primary-5 rounded-tr-[5px] rounded-br-[5px]"></div>
        <div className="text-center text-primary-5 text-2xl font-extrabold leading-loose">
          Artigos MIL
        </div>
      </div>
      <ul>
        {posts
          .filter((post) => post.type === 'special')
          .map((post) => (
            <Card
              key={post._id}
              slug={post.slug}
              title={post.title}
              picture={post.coverImage}
            />
          ))}
      </ul>
    </section>
  )
}
