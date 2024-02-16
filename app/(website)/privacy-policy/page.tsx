import {
  PortableText,
  type PortableTextReactComponents,
} from '@portabletext/react'
import IndexPageHead from 'components/IndexPageHead'
import { PostBody } from 'features/post'
import Header from 'layouts/Header'
import { Page } from 'layouts/Page'
import { readToken } from 'lib/sanity.api'
import { getClient, getSettings } from 'lib/sanity.client'
import { Settings } from 'lib/sanity.queries'
import { draftMode } from 'next/headers'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  settings: Settings
}

async function getSettingsProps(): Promise<PageProps> {
  const isDraftMode = await draftMode().isEnabled
  const client = getClient(isDraftMode ? { token: readToken } : undefined)

  const [settings] = await Promise.all([getSettings(client)])

  return {
    settings,
    draftMode: isDraftMode,
    token: isDraftMode ? readToken : '',
  }
}

export default async function PrivacyPolicy() {
  const { settings } = await getSettingsProps()

  const { title, social, privacyPolicy, termsConditions } = settings || {}

  return (
    <Page title="Privacy Policy" settings={settings}>
      <div className="mt-10 flex flex-col items-start max-w-screen-md mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-8 text-balance mb-3">
          Política de Privacidade
        </h1>
        <PostBody content={privacyPolicy} />
      </div>
    </Page>
  )
}

export async function generateMetadata() {
  return { title: `Política de Privacidade | ng+` }
}
