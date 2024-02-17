import type { SharedPageProps } from 'app/layout'
import { readToken } from 'lib/sanity.api'
import { getClient, getSettings } from 'lib/sanity.client'
import { Settings } from 'lib/sanity.queries'
import { draftMode } from 'next/headers'

import { Search } from './default'

interface PageProps extends SharedPageProps {
  settings: Settings
}

export default async function SearchPage() {
  const { settings } = await getSettingsProps()

  return <Search settings={settings} />
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
