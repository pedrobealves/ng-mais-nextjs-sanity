import { DiscussionEmbed } from 'disqus-react'

interface CommentsProps {
  slug: string
  identifier: string
  title: string
}

export default function Comments({ slug, identifier, title }: CommentsProps) {
  console.log(`${process.env.NEXT_PUBLIC_NEXTJS_SITE_URL}/post/${slug}`)

  return (
    <DiscussionEmbed
      shortname="miltensei"
      config={{
        url: `${process.env.NEXT_PUBLIC_NEXTJS_SITE_URL}/post/${slug}`,
        identifier: identifier,
        title: title,
      }}
    />
  )
}