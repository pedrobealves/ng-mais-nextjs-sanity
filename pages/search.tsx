'use client'

import { getFetcher } from 'lib/sanity.client'
import { searchQuery } from 'lib/sanity.queries'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import useSWR, { SWRConfig } from 'swr'

export default function Search(props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams?.get('q') || null

  const { data, error } = useSWR([searchQuery, { query: query }], getFetcher)

  data && console.log(data)

  return (
    <>
      <div>Search</div>
    </>
  )
}
