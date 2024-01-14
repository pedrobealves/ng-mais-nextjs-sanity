import { Carousel, CarouselContent, CarouselItem } from 'components/Carousel'
import { Post } from 'lib/sanity.queries'

import { Card } from './Card'
import { Section } from './Section'

type HeroProps = {
  reviews: Post[]
  posts: Post[]
}

export function Hero({ reviews, posts }: HeroProps) {
  return (
    <section className="container flex-col lg:flex-row mx-auto flex w-full pt-12 pb-32 gap-6">
      <Section title="Matérias">
        <Carousel className="">
          <CarouselContent>
            {posts
              .filter((post) => post.type === 'default')
              .slice(0, 3)
              .map((post, index) => (
                <CarouselItem key={post._id}>
                  <Card
                    key={post.slug}
                    type="post"
                    title={post.title}
                    subtitle={post.excerpt}
                    picture={post.coverImage}
                    slug={post.slug}
                  />
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </Section>
      <Section title="Análises">
        {reviews?.map((post) => (
          <Card
            key={post.slug}
            type="review"
            title={post.title}
            subtitle={post.excerpt}
            picture={post.coverImage}
            slug={post.slug}
          />
        ))}
      </Section>
    </section>
  )
}
