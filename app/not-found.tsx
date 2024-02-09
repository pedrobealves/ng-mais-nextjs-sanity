import IndexPageHead from 'components/IndexPageHead'
import Header from 'layouts/Header'
import { NotFound } from 'layouts/NotFound'
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

export default async function NotFoundPage() {
  const { settings } = await getSettingsProps()

  const { title, social } = settings || {}

  return (
    <>
      <IndexPageHead settings={settings} text="404" />
      <Header title={title} social={social} level={2} />
      <NotFound />
    </>
  )
}
