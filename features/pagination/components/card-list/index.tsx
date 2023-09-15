'use client'

import { Card } from 'components/Card'
import { Pagination } from 'components/Pagination'
import { getFetcher } from 'lib/sanity.client'
import { Post } from 'lib/sanity.queries'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWR, { SWRConfig } from 'swr'

type PageProps = {
  posts: Post[]
  type: string
  pageQuery: string
}

const POSTS_PER_PAGE = 8

export function CardList({ pageQuery, posts: initialPosts, type }: PageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = searchParams.get('page')
  const pageIndex = parseInt(page) || 1

  const [isLoading, setIsLoading] = useState(false)
  const [isFirstPage, setIsFirstPage] = useState(false)
  const [isLastPage, setIsLastPage] = useState(false)

  // [(($pageIndex - 1) * 10)...$pageIndex * 10]{
  const paramsForQuery = {
    pageIndex: (pageIndex - 1) * POSTS_PER_PAGE,
    limit: pageIndex * POSTS_PER_PAGE,
  }

  const {
    data: posts,
    error,
    isValidating,
  } = useSWR([pageQuery, paramsForQuery], getFetcher, {
    fallbackData: initialPosts,
    onSuccess: () => {
      setIsLoading(false)
    },
  })

  useEffect(() => {
    setIsFirstPage(pageIndex < 2)
  }, [pageIndex])

  useEffect(() => {
    console.log('numer posts:' + posts.length)
    setIsLastPage(posts.length < POSTS_PER_PAGE)
  }, [posts])

  const handleNextPage = () => {
    router.push(`/${type}?page=${pageIndex + 1}`)
  }

  const handlePrevPage = () => {
    router.push(`/${type}?page=${pageIndex - 1}`)
  }

  return (
    <>
      <section className="flex flex-col gap-8">
        {posts && posts?.length === 0 && (
          <div className="flex h-40 items-center justify-center">
            <span className="text-lg text-gray-500">End of the result!</span>
          </div>
        )}
        {posts && (
          <div className="mt-12 flex flex-row gap-6 [&>*]:basis-[270px] flex-wrap justify-center">
            {posts?.map((item) => (
              <Card.Root slug={item.slug} type={type} key={item._id}>
                <Card.Cover picture={item.coverImage} title={item.title} />
                <Card.Section>
                  <div className="flex flex-col gap-3">
                    <Card.Title title={item.title} />
                  </div>
                  <Card.ReadMore />
                </Card.Section>
              </Card.Root>
            ))}
          </div>
        )}
        <div className="flex justify-center">
          <Pagination
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            pageIndex={pageIndex}
          />
        </div>
      </section>
    </>
  )
}
