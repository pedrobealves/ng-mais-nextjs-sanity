import TitleSection from 'components/TitleSection'
import { News } from 'lib/sanity.queries'

import { Card } from '../Card'
import NewsContainer from './NewsContainer'

export default function NewsSection({ news }: { news: News[] }) {
  return (
    <NewsContainer>
      <TitleSection>TenseiDrop</TitleSection>
      <div className="grid w-full lg:grid-cols-4 md:grid-cols-3 [&>*:first-child]:lg:col-span-2 grid-cols-1 gap-6">
        {news.map((post) => (
          <Card.Root key={post._id}>
            <Card.Cover picture={post.coverImage} title={post.title} />
            <Card.Category category={post.category.title} />
            <Card.InfoContainer>
              <Card.Title title={post.title} subtitle={post.excerpt} />
              <Card.Date dateString={post.date} />
            </Card.InfoContainer>
          </Card.Root>
        ))}
      </div>
    </NewsContainer>
  )
}
