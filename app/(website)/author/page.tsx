import type { SharedPageProps } from 'app/layout'
import { HeadCard } from 'components/HeadCard'
import { Icon } from 'components/Icon'
import { socialIconMap } from 'components/SocialIcon'
import { Page } from 'layouts/Page'
import { readToken } from 'lib/sanity.api'
import { getAllByType, getClient, getSettings } from 'lib/sanity.client'
import { urlForImage } from 'lib/sanity.image'
import { Author, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

interface PageProps extends SharedPageProps {
  settings: Settings
  authors: Author[]
}

export default async function Search() {
  const { settings, authors } = await getAuthors()

  return (
    <Page title="Autores" settings={settings}>
      <section className="max-w-screen-xl mx-auto bg-gray-200 rounded-[36px]">
        <HeadCard title="Autores" />
        <div className="w-full mx-auto pt-16 pb-6 px-4">
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 lg:columns-4">
            {authors.map(({ name, picture, bio, social }, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-start rounded-[45px] py-10 px-8 bg-gray-300 h-fit mb-14 break-inside-avoid"
              >
                <Image
                  src={
                    picture?.asset?._ref
                      ? urlForImage(picture).fit('crop').url()
                      : 'https://source.unsplash.com/96x96/?face'
                  }
                  className="-m-20 w-32 h-32 rounded-full mb-5"
                  height={128}
                  width={128}
                  alt={picture?.alt ?? name}
                />
                <h1 className="text-primary-8 text-center font-extrabold text-2xl text-balance px-4 mb-4">
                  {name}
                </h1>
                <p className="font-normal text-primary-8 text-center text-pretty">
                  {bio}
                </p>
                <div className="flex flex-row gap-4 mt-4">
                  {social?.map((social) => (
                    <Link key={social._key} href={social.url}>
                      <Icon icon={socialIconMap(social.media)} />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Page>
  )
}

async function getAuthors(): Promise<PageProps> {
  const isDraftMode = await draftMode().isEnabled
  const client = getClient(isDraftMode ? { token: readToken } : undefined)

  const [settings, authors] = await Promise.all([
    getSettings(client),
    getAllByType(client, 'author'),
  ])

  return {
    settings,
    authors,
    draftMode: isDraftMode,
    token: isDraftMode ? readToken : '',
  }
}

export async function generateMetadata() {
  return { title: `Autores` }
}
