import type { SharedPageProps } from 'app/layout'
import Link from 'components/Link'
import Header from 'layouts/Header'
import { readToken } from 'lib/sanity.api'
import { getClient, getSettings } from 'lib/sanity.client'
import { Settings } from 'lib/sanity.queries'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import BackgroundImage from 'public/404.png'
import { FaChevronLeft } from 'react-icons/fa6'

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
      <Header title={title} social={social} level={2} />
      <main className="relative w-full h-screen">
        <Image
          src={BackgroundImage.src}
          alt="404"
          fill={true}
          priority={true}
          className="absolute pt-20 object-cover"
        />
        <div className="absolute bottom-0 w-full content-start z-50 pb-9">
          <div className="flex w-full justify-center">
            <Link
              className="flex justify-center w-fit text-primary-8 bg-white p-3 rounded-full"
              href={'/'}
            >
              <FaChevronLeft size={48} />
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export async function generateMetadata() {
  return {
    title: '404',
  }
}
