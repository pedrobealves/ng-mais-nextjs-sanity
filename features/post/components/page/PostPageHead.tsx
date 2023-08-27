import BlogMeta from 'components/BlogMeta'
import * as demo from 'lib/demo.data'
import { urlForImage } from 'lib/sanity.image'
import { Post, Settings } from 'lib/sanity.queries'
import Head from 'next/head'

export interface PostPageHeadProps {
  settings: Settings
  post: Post
}

export default function PostPageHead({ settings, post }: PostPageHeadProps) {
  const title = settings.title ?? demo.title
  return (
    <Head>
      <title>{post.title ? `${post.title} | ${title}` : title}</title>
      <BlogMeta />
      <meta key="description" name="description" content={post.excerpt} />
      {post.coverImage?.asset?._ref && (
        <meta
          property="og:image"
          content={urlForImage(post.coverImage)
            .width(1200)
            .height(627)
            .fit('crop')
            .url()}
        />
      )}
      <meta name="vertical" content="Games" />
      <meta name="category" content={post._type} />
      <meta property="og:title" content={post.title} />
      <meta
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_NEXTJS_SITE_URL}/${post._type}/${post.slug}`}
      />
      <meta property="og:description" content={post.excerpt} />
      <meta property="og:site_name" content={settings.title} />
      <meta property="og:type" content="article" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="article:published_time" content={post.date} />
      <meta property="article:publisher" content={post.author.name} />
      {post.category?.title && (
        <meta property="article:section" content={post.category.title} />
      )}
      {post.category?.title && (
        <meta property="article:tag" content={post.category.title} />
      )}
      <meta name="twitter:site" content="@miltensei" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@miltensei" />
      <meta
        name="twitter:imageUrl"
        content={urlForImage(post.coverImage)
          .width(1200)
          .height(627)
          .fit('crop')
          .url()}
      />
      <meta
        name="twitter:image"
        content={urlForImage(post.coverImage)
          .width(1200)
          .height(627)
          .fit('crop')
          .url()}
      />
    </Head>
  )
}
