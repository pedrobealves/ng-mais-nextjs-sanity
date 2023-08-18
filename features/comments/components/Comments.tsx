import { DiscussionEmbed } from 'disqus-react'

interface CommentsProps {
  slug: string
  identifier: string
  title: string
  type: string
}

export function Comments({ slug, identifier, type, title }: CommentsProps) {
  return (
    <DiscussionEmbed
      shortname="miltensei"
      config={{
        url: `${process.env.NEXT_PUBLIC_NEXTJS_SITE_URL}/${type}/${slug}`,
        identifier: identifier,
        title: title,
      }}
    />
  )
}
