import { Card } from 'components/Card'
import { Section } from 'components/Section'
import type { Category, Post } from 'lib/sanity.queries'

type NewsProps = {
  news: Post[]
  categories: Category[]
}

export function NewsSection({ news, categories }: NewsProps) {
  return (
    <Section.Root>
      <Section.Title>Notícias</Section.Title>
      <Section.Container>
        <div className="flex flex-wrap gap-2 py-4">
          <button className="px-4 py-3 rounded-full bg-primary-8 font-bold text-white">
            Todas notícias
          </button>
          {categories?.map((category, index) => (
            <button
              key={index}
              className="px-4 py-3 rounded-full bg-white font-bold text-primary-8 hover:bg-primary-8 hover:text-white"
            >
              {category.title}
            </button>
          ))}
        </div>
        <div className="flex flex-col sm:auto-rows-fr lg:grid-cols-3 sm:grid sm:grid-cols-2 gap-4">
          {news?.map((item) => (
            <Card.Root slug={item.slug} type={item._type} key={item._id}>
              <Card.Cover picture={item.coverImage} title={item.title} />
              <Card.Section>
                <div className="flex flex-col gap-3">
                  {item.category && (
                    <Card.Category
                      category={item.category.title}
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
