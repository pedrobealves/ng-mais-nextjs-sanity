import { Carousel, CarouselContent, CarouselItem } from 'components/Carousel'
import { Post } from 'lib/sanity.queries'

import { Card } from './Card'
import { Section } from './Section'

type HeroProps = {
  reviews: Post[]
  posts: Post[]
}

export function HomeHero({ reviews, posts }: HeroProps) {
  return (
    <section className="container flex-col lg:flex-row mx-auto flex w-full sm:pt-8 pt-4 sm:pb-12 pb-8 sm:gap-4 gap-2 md:px-4">
      <Section>
        <Carousel className="">
          <CarouselContent>
            {posts.slice(0, 4).map((post, index) => (
              <CarouselItem key={post._id}>
                <Card
                  key={post.slug}
                  type="post"
                  title={post.title}
                  subtitle={post.excerpt}
                  picture={post.coverImage}
                  slug={post.slug}
                  index={index}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Section>
      <Section>
        {reviews
          ?.slice(0, 3)
          .map((post, index) => (
            <Card
              key={post.slug}
              type="review"
              title={post.game?.title}
              subtitle={post.excerpt}
              picture={post.coverImage}
              slug={post.slug}
              index={index}
            />
          ))}
      </Section>
    </section>
  )
}
