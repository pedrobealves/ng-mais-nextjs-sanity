import { DiscussionEmbed } from 'disqus-react'

interface CommentsProps {
  slug: string
  identifier: string
  title: string
}

export default function Comments({ slug, identifier, title }: CommentsProps) {
  return (
    <DiscussionEmbed
      shortname="miltensei"
      config={{
        url: `${process.env.NEXT_PUBLIC_NEXTJS_SITE_URL}/posts/${slug}`,
        identifier: identifier,
        title: title,
      }}
    />
  )
}
