import Link from 'components/Link'
import { Section } from 'components/Section'
import type { Category, Post } from 'lib/sanity.queries'

import { Card } from './Card'

type StandardGridProps = {
  title: string
  news: Post[]
  categories: Category[]
}

export function StandardGrid({ title, news, categories }: StandardGridProps) {
  return (
    <Section.Root>
      <Section.Title>{title}</Section.Title>
      <Section.Container>
        <div className="flex flex-wrap md:gap-2 gap-1 sm:py-4 py-2 md:text-base text-sm">
          <Link href="/news">
            <button className="md:px-4 px-3 md:py-3 py-2 rounded-full bg-primary-8 font-bold text-white">
              Todas notícias
            </button>
          </Link>
          {categories
            ?.filter(
              (category, index, self) =>
                index === self.findIndex((c) => c.title === category.title),
            )
            .map((category, index) => (
              <Link key={index} href={`/tag/${category.slug}`}>
                <button className="md:px-4 px-3 md:py-3 py-2 rounded-full bg-white font-bold text-primary-8 hover:bg-primary-8 hover:text-white">
                  {category.title}
                </button>
              </Link>
            ))}
        </div>
        <div className="flex flex-col sm:auto-rows-fr lg:grid-cols-3 sm:grid sm:grid-cols-2 sm:gap-4 gap-2">
          {news?.map((item) => (
            <Card.Root slug={item.slug} type={item._type} key={item._id}>
              <Card.Cover picture={item.coverImage} title={item.title} />
              <Card.Section>
                <div className="flex flex-col gap-3">
                  {item.tag && (
                    <Card.Category
                      category={item.tag[0].title}
                      dateString={item.date}
                    />
                  )}
                  <Card.Title title={item.title} />
                </div>
                <Card.ReadMore />
              </Card.Section>
            </Card.Root>
          ))}
        </div>
      </Section.Container>
    </Section.Root>
  )
}
