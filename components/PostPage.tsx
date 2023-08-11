import Container from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import MoreStories from 'components/MoreStories'
import PostBody from 'components/PostBody'
import PostHeader from 'components/PostHeader'
import PostPageHead from 'components/PostPageHead'
import PostTitle from 'components/PostTitle'
import SectionSeparator from 'components/SectionSeparator'
import { DiscussionEmbed } from 'disqus-react'
import * as demo from 'lib/demo.data'
import type { News, Post, Settings } from 'lib/sanity.queries'
import { notFound } from 'next/navigation'
import { FaFacebook, FaTwitter } from 'react-icons/fa'

import Icon from './Icon'
import Link from './Link'
import { Author } from './Post/Author'
import PostAuthorBio from './Post/Author/PostAuthorBio'
import TitleSection from './TitleSection'

export interface PostPageProps {
  preview?: boolean
  loading?: boolean
  post: Post
  news: News[]
  morePosts: Post[]
  settings: Settings
}

const NO_POSTS: Post[] = []

export default function PostPage(props: PostPageProps) {
  const { preview, loading, morePosts = NO_POSTS, post, settings, news } = props
  const { title = demo.title } = settings || {}

  const slug = post?.slug

  console.log(news)

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
                  game={post.game}
                  excerpt={post.excerpt}
                  slug={post.slug}
                />
                <PostBody content={post.content} />
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
              <SectionSeparator />
              {news?.length > 0 && <MoreStories posts={morePosts} />}
              <TitleSection>Comentários</TitleSection>
              <DiscussionEmbed
                shortname="example"
                config={{
                  url: `${process.env.NEXT_PUBLIC_NEXTJS_SITE_URL}/post/${post.slug}`,
                  identifier: post._id,
                  title: post.title,
                  language: 'pt_BR', //e.g. for Traditional Chinese (Taiwan)
                }}
              />
            </main>
          </>
        )}
      </Layout>
    </>
  )
}
