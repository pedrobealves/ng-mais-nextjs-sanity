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
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="720" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta
        property="og:image"
        content={urlForImage(post.coverImage)
          .width(1280)
          .height(720)
          .fit('crop')
          .url()}
      />
      <meta property="article:published_time" content={post.date} />
      <meta
        property="article:modified_time"
        content={post._updatedAt ? post._updatedAt : post.date}
      />
      <meta property="article:publisher" content={settings.title} />
      {post.author && (
        <meta property="article:author" content={post.author.name} />
      )}
      {post.category?.title && (
        <meta property="article:section" content={post.category.title} />
      )}
      {post.tag?.map((tag, index) => (
        <meta property="article:tag" content={tag.title} key={index} />
      ))}
      <meta name="twitter:site" content="@newgame_mais" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@newgame_mais" />
      {post.coverImage && (
        <meta
          name="twitter:imageUrl"
          content={urlForImage(post.coverImage)
            .width(1200)
            .height(627)
            .fit('crop')
            .url()}
        />
      )}
      {post.coverImage && (
        <meta
          name="twitter:image"
          content={urlForImage(post.coverImage)
            .width(1200)
            .height(627)
            .fit('crop')
            .url()}
        />
      )}
    </Head>
  )
}
