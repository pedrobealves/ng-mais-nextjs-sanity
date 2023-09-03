import { urlForImage } from 'lib/sanity.image'
import { Post } from 'lib/sanity.queries'
import Image from 'next/image'
import Link from 'next/link'
import { tv, VariantProps } from 'tailwind-variants'

import { Card } from './Card'

type CardProps = {
  posts: Post[]
  type: 'review' | 'weekly'
}

export function Section({ type, posts }: CardProps) {
  return (
    <div className="flex flex-col basis-1/2 gap-4 w-full">
      <div className="flex justify-start items-center gap-4">
        <div className="w-2 h-9 bg-white rounded-tr-[5px] rounded-br-[5px]"></div>
        <div className="text-center text-white text-2xl font-extrabold leading-loose">
          {type === 'review' ? 'Reviews' : 'TenseiWeekly'}
        </div>
      </div>
      <div className="flex sm:flex-row flex-col gap-6">
        {posts?.map((post) => (
          <Card
            key={post.slug}
            type={type}
            title={post.title}
            subtitle={post.excerpt}
            picture={post.coverImage}
            slug={post.slug}
          />
        ))}
      </div>
    </div>
  )
}
