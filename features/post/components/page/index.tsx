import Layout from 'components/BlogLayout'
import { Icon } from 'components/Icon'
import Link from 'components/Link'
import { Section } from 'components/Section'
import { socialIconMap } from 'components/SocialIcon'
import { Comments } from 'features/comments'
import { MinimalGrid } from 'features/grid'
import { SubscribeNewsletter } from 'features/newsletter'
import { Author } from 'features/post/components/page/Author'
import { Review as ReviewSection } from 'features/review'
import Footer from 'layouts/Footer'
import Header from 'layouts/Header'
import * as demo from 'lib/demo.data'
import type { Post, Review, Settings } from 'lib/sanity.queries'
import { notFound } from 'next/navigation'

import PostBody from './PostBody'
import PostHeader from './PostHeader'
import PostPageHead from './PostPageHead'
import PostTitle from './PostTitle'

export interface PostPageProps {
  preview?: boolean
  loading?: boolean
  post: Post
  news?: Post[]
  reviewDetails?: Review
  settings: Settings
}

const NO_NEWS: Post[] = []

export function PostPage(props: PostPageProps) {
  const {
    preview,
    loading,
    post,
    settings,
    reviewDetails,
    news = NO_NEWS,
  } = props
  const { title = demo.title, social } = settings || {}

  const slug = post?.slug

  if (!slug && !preview) {
    notFound()
  }

  return (
    <>
      <PostPageHead settings={settings} post={post} />

      <Layout preview={preview} loading={loading}>
        <Header title={title} social={social} level={2} />
        {preview && !post ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <main className="md:pt-40 pt-32 px-4">
              <article className="flex flex-col items-start max-w-screen-md mx-auto w-full md:gap-11 gap-6">
                <PostHeader
                  title={post.title}
                  _type={post._type}
                  coverImage={post.coverImage}
                  showCover={post.showCover}
                  date={post.date}
                  author={post.author}
                  category={post.category}
                  excerpt={post.excerpt}
                  slug={post.slug}
                />
                <PostBody content={post.content} />
                {post._type == 'review' && (
                  <ReviewSection review={reviewDetails} />
                )}
                {post.author && (
                  <Author.Root>
                    <Author.Avatar
                      picture={post.author.picture}
                      name={post.author.name}
                    />
                    <Author.BioContainer>
                      <Author.Bio
                        name={post.author.name}
                        bio={post.author.bio}
                      />
                      <Author.Icons>
                        {post.author.social?.map((social) => (
                          <Link key={social._key} href={social.url}>
                            <Icon icon={socialIconMap(social.media)} />
                          </Link>
                        ))}
                      </Author.Icons>
                    </Author.BioContainer>
                  </Author.Root>
                )}
                <SubscribeNewsletter />
              </article>
            </main>
            {news?.length > 0 && (
              <aside aria-label="Related articles" className="px-4 pt-12">
                <MinimalGrid title="Relacionados" news={news} type="post" />
              </aside>
            )}
            <section className="flex flex-col justify-start max-w-screen-xl mx-auto w-full gap-10 px-4 pt-12 pb-24">
              <Section.Title>Comentários</Section.Title>
              <div className="max-w-screen-md mx-auto w-full">
                <Comments
                  type={post._type}
                  slug={post.slug}
                  identifier={post._id}
                  title={post.title}
                />
              </div>
            </section>
            <Footer />
          </>
        )}
      </Layout>
    </>
  )
}
