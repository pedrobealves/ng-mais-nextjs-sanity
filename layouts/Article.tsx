import Layout from 'components/BlogLayout'
import IndexPageHead from 'components/IndexPageHead'
import PostPageHead from 'features/post/components/page/PostPageHead'
import PostTitle from 'features/post/components/page/PostTitle'
import * as demo from 'lib/demo.data'
import { Post, Settings } from 'lib/sanity.queries'

import Footer from './Footer'
import Header from './Header'

type ArticleProps = {
  preview?: boolean
  loading?: boolean
  post: Post
  settings: Settings
  children: React.ReactNode
}

export function Article({
  children,
  preview,
  loading,
  settings,
  post,
}: ArticleProps) {
  const { title = demo.title, social } = settings || {}

  return (
    <>
      <Layout preview={preview} loading={loading}>
        <Header title={title} social={social} level={2} />
        {preview && !post ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            {children}
            <Footer settings={settings} />
          </>
        )}
      </Layout>
    </>
  )
}
