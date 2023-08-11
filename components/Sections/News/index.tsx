import TitleSection from 'components/TitleSection'
import { News } from 'lib/sanity.queries'

import NewsCard from './NewsCard'
import NewsContainer from './NewsContainer'

export default function NewsSection({ news }: { news: News[] }) {
  return (
    <NewsContainer>
      <TitleSection>TenseiDrop</TitleSection>
      <div className="grid w-full lg:grid-cols-4 md:grid-cols-3 [&>*:first-child]:lg:col-span-2 grid-cols-1 gap-6">
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </div>
    </NewsContainer>
  )
}
