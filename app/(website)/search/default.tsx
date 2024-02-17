'use client'

import type { SharedPageProps } from 'app/layout'
import { HeadCard } from 'components/HeadCard'
import { Icon } from 'components/Icon'
import IndexPageHead from 'components/IndexPageHead'
import { ItemCard } from 'components/ItemCard'
import { set } from 'date-fns'
import { Card } from 'features/grid/components/standard-grid/Card'
import Footer from 'layouts/Footer'
import Header from 'layouts/Header'
import { Page } from 'layouts/Page'
import { readToken } from 'lib/sanity.api'
import { getFetcher } from 'lib/sanity.client'
import { getClient, getSettings } from 'lib/sanity.client'
import { searchQuery } from 'lib/sanity.queries'
import { Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { draftMode } from 'next/headers'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import useSWR, { SWRConfig } from 'swr'

type SearchPageProps = {
  settings: Settings
}

export function Search({ settings }: SearchPageProps) {
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
    <Page title="Pesquisa" settings={settings}>
      <section className="max-w-screen-xl mx-auto bg-gray-200 rounded-[36px]">
        <HeadCard title="Pesquisa" />
        <form
          name="search-form"
          data-name="search Form"
          id="search-form"
          aria-label="search Form"
          className="-mt-9 flex justify-between rounded-3xl shadow-2xl bg-white border max-w-xl mx-auto"
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
        <section className="mt-12 flex flex-row gap-6 [&>*]:basis-[270px] flex-wrap justify-center pb-12">
          {data?.map((item) => (
            <ItemCard.Root slug={item.slug} type={item._type} key={item._id}>
              <ItemCard.Cover picture={item.coverImage} title={item.title} />
              <div className="flex flex-col items-center gap-3 px-6 pb-6">
                <ItemCard.Category category={item.category.title} />
                <ItemCard.Title title={item.title} />
                <ItemCard.Author author={item.author.name} />
              </div>
            </ItemCard.Root>
          ))}
        </section>
      </section>
    </Page>
  )
}
