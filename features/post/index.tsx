import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import Icon from 'components/Icon'
import Link from 'components/Link'
import TitleSection from 'components/TitleSection'
import { Comments } from 'features/comments'
import { NewsDrop } from 'features/news-drop'
import { Author } from 'features/post/components/Author'
import { Review as ReviewSection } from 'features/review'
import Footer from 'layouts/Footer'
import * as demo from 'lib/demo.data'
import type { Post, Review, Settings } from 'lib/sanity.queries'
import { notFound } from 'next/navigation'
import { FaFacebook, FaTwitter } from 'react-icons/fa'
import review from 'schemas/review'

import PostBody from './components/PostBody'
import PostHeader from './components/PostHeader'
import PostPageHead from './components/PostPageHead'
import PostTitle from './components/PostTitle'

export interface PostPageProps {
  preview?: boolean
  loading?: boolean
  post: Post
  news?: Post[]
  reviewDetails?: Review
  settings: Settings
}

const NO_NEWS: Post[] = []

export default function PostPage(props: PostPageProps) {
  const {
    preview,
    loading,
    post,
    settings,
    reviewDetails,
    news = NO_NEWS,
  } = props
  const { title = demo.title } = settings || {}

  const slug = post?.slug

  if (!slug && !preview) {
    notFound()
  }

  return (
    <>
      <PostPageHead settings={settings} post={post} />

      <Layout preview={preview} loading={loading}>
        <BlogHeader title={title} level={2} />
        {preview && !post ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <main className="md:pt-40 pt-32 px-4">
              <article className="flex flex-col items-start max-w-screen-md mx-auto w-full md:gap-11 gap-6">
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage}
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
                <Author.Root>
                  <Author.Avatar
                    picture={post.author.picture}
                    name={post.author.name}
                  />
                  <Author.BioContainer>
                    <Author.Bio name={post.author.name} bio={post.author.bio} />
                    <Author.Icons>
                      {post.author.facebook && (
                        <Link url={post.author.facebook}>
                          <Icon icon={FaFacebook} />
                        </Link>
                      )}
                      {post.author.twitter && (
                        <Link url={post.author.twitter}>
                          <Icon icon={FaTwitter} />
                        </Link>
                      )}
                    </Author.Icons>
                  </Author.BioContainer>
                </Author.Root>
              </article>
            </main>
            {news?.length > 0 && <NewsDrop news={news} />}
            <section className="flex flex-col justify-start max-w-screen-xl mx-auto w-full gap-10 px-4 pt-12 pb-24">
              <TitleSection>Comentários</TitleSection>
              <div className="max-w-screen-md mx-auto w-full">
                <Comments
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
