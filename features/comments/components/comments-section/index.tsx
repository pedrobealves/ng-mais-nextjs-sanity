'use client'
import { DiscussionEmbed } from 'disqus-react'
import { Suspense } from 'react'
import { InView } from 'react-intersection-observer'

interface CommentsProps {
  slug: string
  identifier: string
  title: string
  type: string
}

export function Comments({ slug, identifier, type, title }: CommentsProps) {
  return (
    <InView triggerOnce>
      {({ ref, inView }) => (
        <Suspense>
          <div ref={ref}>
            {inView && (
              <DiscussionEmbed
                shortname="miltensei"
                config={{
                  url: `${process.env.NEXT_PUBLIC_NEXTJS_SITE_URL}/${type}/${slug}`,
                  identifier: identifier,
                  title: title,
                }}
              />
            )}
          </div>
        </Suspense>
      )}
    </InView>
  )
}
