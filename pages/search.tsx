'use client'

import { Card } from 'components/Card'
import { HeadCard } from 'components/HeadCard'
import { Icon } from 'components/Icon'
import IndexPageHead from 'components/IndexPageHead'
import { set } from 'date-fns'
import Footer from 'layouts/Footer'
import Header from 'layouts/Header'
import { readToken } from 'lib/sanity.api'
import { getFetcher } from 'lib/sanity.client'
import { getClient, getSettings } from 'lib/sanity.client'
import { searchQuery } from 'lib/sanity.queries'
import { Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'
import type { SharedPageProps } from 'pages/_app'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import useSWR, { SWRConfig } from 'swr'

interface PageProps extends SharedPageProps {
  settings: Settings
}

interface Query {
  [key: string]: string
}

export default function Search(props: PageProps) {
  const { settings } = props
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || null
  const [searchInput, setSearchInput] = useState('')

  const { data, error } = useSWR([searchQuery, { query: query }], getFetcher)

  useEffect(() => {
    setSearchInput(query || '')
  }, [query])

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/search?q=${searchInput}`)
  }

  return (
    <>
      <IndexPageHead settings={settings} />
      <Header social={settings.social} level={2} />
      <main className="w-full md:pt-40 pt-32 px-4 mb-14">
        <section className="max-w-col-12 mx-auto">
          <HeadCard title="Pesquisa" />
          <form
            name="search-form"
            data-name="search Form"
            id="search-form"
            aria-label="search Form"
            className="-mt-9 flex justify-between rounded-3xl shadow-2xl bg-white border max-w-col-6 mx-auto"
            onSubmit={handleFormSubmit}
          >
            <div className="py-6 px-4 opacity-70">
              <Icon
                icon={FiSearch}
                color="text-primary-7"
                hoverColor="hover:text-primary-7"
                size={24}
              />
            </div>
            <input
              type="text"
              className="sm:flex-1 w-full outline-none rounded-3xl pl-1 pr-4 text-lg font-medium"
              placeholder="O que você procura?"
              value={searchInput}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchInput(e.target.value)
              }
              required
            />
          </form>
          <section className="mt-12 flex flex-row gap-6 [&>*]:basis-[270px] flex-wrap justify-center">
            {data?.map((item) => (
              <Card.Root slug={item.slug} type={item._type} key={item._id}>
                <Card.Cover picture={item.coverImage} title={item.title} />
                <Card.Section>
                  <div className="flex flex-col gap-3">
                    <Card.Title title={item.title} />
                  </div>
                  <Card.ReadMore />
                </Card.Section>
              </Card.Root>
            ))}
          </section>
        </section>
      </main>
      <Footer />
    </>
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
