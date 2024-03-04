'use client'

import { MinimalGrid } from 'features/grid'
import { Post } from 'lib/sanity.queries'
import { InView } from 'react-intersection-observer'

type RelatedPostsProps = {
  news: Post[]
}

export function RelatedPosts({ news }: RelatedPostsProps) {
  return (
    <>
      {news?.length > 0 && (
        <aside
          aria-label="Related articles"
          className="max-w-screen-xl mx-auto pt-12"
        >
          <InView triggerOnce threshold={1}>
            {({ inView, ref }) => (
              <div ref={ref}>
                {inView && (
                  <MinimalGrid title="Relacionados" news={news} type="post" />
                )}
              </div>
            )}
          </InView>
        </aside>
      )}
    </>
  )
}
