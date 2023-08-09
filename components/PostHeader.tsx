import Avatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'
import PostTitle from 'components/PostTitle'
import type { Post } from 'lib/sanity.queries'

import PostCategory from './PostCategory'
import PostShare from './PostShare'
import PostSubTitle from './PostSubTitle'

export default function PostHeader(
  props: Pick<
    Post,
    'title' | 'coverImage' | 'excerpt' | 'date' | 'author' | 'slug' | 'game'
  >,
) {
  const { title, coverImage, date, author, slug, game } = props
  const shareUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  return (
    <>
      <PostCategory game={game} date={date} />
      <div className="max-w-2xl">
        <PostTitle>{title}</PostTitle>
        <PostSubTitle>{props.excerpt}</PostSubTitle>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-8 mx-auto">
        {author && <Avatar name={author.name} picture={author.picture} />}
        <div className="hidden md:flex h-[72px] w-0.5">
          <svg
            width="100%"
            height="100%"
            preserve-aspect-ratio="none"
            view-box="0 0 2 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 1 0 V 72" stroke="#D1D5DB" stroke-width="2" />
          </svg>
        </div>
        <PostShare url={`${shareUrl}/room/voting-room/${slug}`} />
      </div>
      <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage title={title} image={coverImage} priority slug={slug} />
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 block md:hidden">
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
      </div>
    </>
  )
}
