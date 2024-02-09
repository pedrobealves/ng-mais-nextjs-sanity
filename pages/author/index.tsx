'use client'

import { Page } from 'layouts/Page'
import { readToken } from 'lib/sanity.api'
import { getClient, getSettings } from 'lib/sanity.client'
import { Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  settings: Settings
}

interface Query {
  [key: string]: string
}

export default function Search(props: PageProps) {
  const { settings } = props

  const author = [
    'Name Author',
    'Name Author',
    'Name Author',
    'Name Author',
    'Name Author',
    'Name Author',
    'Name Author',
    'Name Author',
  ]

  return (
    <Page title="Pesquisa" settings={settings}>
      <div className="max-w-5xl w-full grid grid-cols-4 mx-auto gap-6">
        {author.map((name, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center rounded-[45px] py-10 px-8 bg-gray-200 border-4 border-primary-8"
          >
            <div className="w-32 h-32 bg-primary-8 rounded-2xl mb-5" />
            <h1 className="text-primary-8 text-center font-extrabold text-2xl text-balance px-4">
              {name}
            </h1>
          </div>
        ))}
      </div>
    </Page>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings] = await Promise.all([getSettings(client)])

  return {
    props: {
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
