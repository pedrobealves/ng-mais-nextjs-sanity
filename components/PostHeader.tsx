import Avatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'
import PostTitle from 'components/PostTitle'
import type { Post } from 'lib/sanity.queries'
import { useEffect, useState } from 'react'

import PostCategory from './PostCategory'
import PostShare from './PostShare'
import PostSubTitle from './PostSubTitle'

export default function PostHeader(
  props: Pick<
    Post,
    'title' | 'coverImage' | 'excerpt' | 'date' | 'author' | 'slug' | 'game'
  >,
) {
  const { title, coverImage, date, author, excerpt, slug, game } = props

  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(location.origin)
  }, [slug])

  console.log(
    'process.env.NEXT_PUBLIC_NEXTJS_SITE_URL' +
      process.env.NEXT_PUBLIC_NEXTJS_SITE_URL,
  )

  return (
    <>
      <PostCategory game={game} date={date} />
      <div className="max-w-2xl">
        <PostTitle>{title}</PostTitle>
        <PostSubTitle>{excerpt}</PostSubTitle>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-y-8 mx-auto divide-x-2">
        {author && <Avatar name={author.name} picture={author.picture} />}
        <PostShare url={`${url}/posts/${slug}`} />
      </div>
      <CoverImage title={title} image={coverImage} priority slug={slug} />
    </>
  )
}
