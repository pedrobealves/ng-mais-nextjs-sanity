import { Icon } from 'components/Icon'
import IndexPageHead from 'components/IndexPageHead'
import Link from 'components/Link'
import { socialIconMap } from 'components/SocialIcon'
import { readToken } from 'lib/sanity.api'
import { getClient, getSettings } from 'lib/sanity.client'
import { Settings } from 'lib/sanity.queries'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import type { SharedPageProps } from 'pages/_app'
import logotype from 'public/logotype.svg'
import symbol from 'public/og.svg'

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

export default async function Search(props: PageProps) {
  const { settings } = await getSettingsProps()

  return (
    <>
      <IndexPageHead settings={settings} text="linktree" />
      <main className="w-full h-full bg-gray-200 px-6 mb-12">
        <div className="flex flex-col justify-center items-center pt-16 gap-3">
          <Image height={96} priority src={symbol} alt="Logosymbol" />
          <Image
            height={56}
            priority
            src={logotype}
            alt="Logotype"
            className="ml-10"
          />
        </div>
        <div className="flex flex-col mx-auto justify-center items-center gap-3 pt-10 max-w-xl">
          <h1 className="font-bold text-primary-8 uppercase pb-1">
            Redes Sociais
          </h1>
          {settings.social.map((item) => (
            <Link
              href={item.url}
              key={item._key}
              className="flex flex-row w-full border-2 border-primary-8 text-primary-8 font-bold p-3 rounded-md hover:bg-primary-8 hover:text-white"
            >
              <Icon icon={socialIconMap(item.media)} size={24} />
              <span className="flex justify-center items-center w-full -m-6">
                {item.media}
              </span>
            </Link>
          ))}
          <h1 className="font-bold text-primary-8 uppercase pt-4 pb-1">Mais</h1>
          {settings.linktree.map((item) => (
            <Link
              href={item.url}
              key={item._key}
              className="text-center w-full border-2 border-primary-8 text-primary-8 font-bold p-3 rounded-md hover:bg-primary-8 hover:text-white"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export async function generateMetadata() {
  return { title: `linktree | ng+` }
}
