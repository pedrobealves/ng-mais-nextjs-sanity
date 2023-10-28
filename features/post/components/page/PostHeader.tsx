import Avatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'
import type { Post } from 'lib/sanity.queries'

import PostCategory from './PostCategory'
import PostShare from './PostShare'
import PostSubTitle from './PostSubTitle'
import PostTitle from './PostTitle'

export default function PostHeader(
  props: Pick<
    Post,
    | 'title'
    | '_type'
    | 'coverImage'
    | 'showCover'
    | 'excerpt'
    | 'date'
    | 'author'
    | 'slug'
    | 'category'
  >,
) {
  const {
    title,
    _type,
    coverImage,
    showCover,
    date,
    author,
    excerpt,
    slug,
    category,
  } = props

  return (
    <>
      <PostCategory category={category} date={date} />
      <div className="max-w-2xl">
        <PostTitle>{title}</PostTitle>
        <PostSubTitle>{excerpt}</PostSubTitle>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-y-8 mx-auto divide-x-2">
        <Avatar name={author.name} picture={author.picture} />
        <PostShare
          url={`${process.env.NEXT_PUBLIC_NEXTJS_SITE_URL}/${_type}/${slug}`}
        />
      </div>
      {showCover && (
        <CoverImage title={title} image={coverImage} priority slug={slug} />
      )}
    </>
  )
}
