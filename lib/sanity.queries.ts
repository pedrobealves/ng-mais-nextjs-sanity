import { groq } from 'next-sanity'

const postFields = groq`
  _id,
  _type,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  showCover,
  "slug": slug.current,
`

export const settingsQuery = groq`*[_type == "settings"][0]`

const related = (type: string, filter: string) => groq`
"related": *[_type == "${type}" && ${filter} && slug.current != ^.slug.current] | order(publishedAt desc, _createdAt desc) [0..2] {
  category[0]->{title, "slug": slug.current},
  ${postFields}
}
`
export const relatedByTag = (type: string) => groq`
  ${related(type, 'count(tag[@._ref in ^.^.tag[]._ref]) > 0')}
`

export const relatedByCategory = (type: string) => groq`
  ${related(type, 'category._ref == ^.category._ref')}
`

export const topPaginationQuery = groq`
*[_type == "review" && game != null]| order(grade desc, _updatedAt desc)[$pageIndex...$limit] {
  grade,
  "slug": slug.current,
  game->{title, "slug": slug.current, cover, release, developer, genre},
}
`

export const searchQuery = groq`
*[ _type in ["news", "post", "review"] && [title, excerpt] match $query] | 
score(
  boost(title match $query, 3),
  boost(excerpt match $query, 2)
) {
  ${postFields}
}
`

export const categoryQuery = groq`
*[_type == "news" && tag[0]._ref in *[_type=="tag"]._id].tag[]->{_id, title, slug}
`

export const newsDropPaginationQuery = groq`
*[_type in ["news", "post", "review"] && drop == true] | order(date desc, _updatedAt desc) [$pageIndex...$limit] {
  category[0]->{title, "slug": slug.current},
  ${postFields}
}
`

//Posts

export const postsByTagPaginationQuery = (tag: string) => groq`
*[_type == "post" && "${tag}" in tag[]->slug.current ] | order(date desc, _updatedAt desc)[$pageIndex...$limit] {
  ${postFields}
}`

export const postsPaginationQuery = groq`
*[_type == "post" && tag == null] | order(date desc, _updatedAt desc)[$pageIndex...$limit] {
  ${postFields}
}`

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    "author": author->{name, picture, bio, social},
    "category": game->{title, "slug": slug.current},
    ${postFields}
    ${relatedByTag('post')}
  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`
export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

//news

export const newsQuery = groq`
*[_type == "news"] | order(date desc, _updatedAt desc) {
  "category": tag[0]->{title, "slug": slug.current},
  ${postFields}
}`

export const newsPaginationQuery = groq`
*[_type == "news"] | order(date desc, _updatedAt desc)[$pageIndex...$limit] {
  "category": tag[0]->{title, "slug": slug.current},
  ${postFields}
}`

export const newsAndMoreStoriesQuery = groq`
{
  "news": *[_type == "news" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    "author": author->{name, picture, bio, social},
    "category": tag[0]->{title, "slug": slug.current},
    ${postFields}
    ${relatedByTag('news')}
  }
}`

export const newsSlugsQuery = groq`
*[_type == "news" && defined(slug.current)][].slug.current
`
export const newsBySlugQuery = groq`
*[_type == "news" && slug.current == $slug][0] {
  ${postFields}
}
`

//review

export const reviewsPaginationQuery = groq`
*[_type == "review"] | order(date desc, _updatedAt desc)[$pageIndex...$limit] {
  "category": game->{title, "slug": slug.current},
  ${postFields}
}`

export const reviewsQuery = groq`
*[_type == "review"] | order(date desc, _updatedAt desc) {
  "category": game->{title, "slug": slug.current},
  ${postFields}
}`

export const reviewAndMoreStoriesQuery = groq`
{
  "review": *[_type == "review" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    "author": author->{name, picture, bio, social},
    "category": game->{title, "slug": slug.current},
    ${postFields}
    ${relatedByCategory('review')}
  },
  "reviewDetails": *[_type == "review" && slug.current == $slug] | order(_updatedAt desc) [0] {
    _id,
    pros,
    cons,
    verdict,
    grade,
  },
}`

export const reviewSlugsQuery = groq`
*[_type == "review" && defined(slug.current)][].slug.current
`

export const reviewBySlugQuery = groq`
*[_type == "review" && slug.current == $slug][0] {
  ${postFields}
}
`

//index

export const indexQuery = groq`
{
  "news": ${newsPaginationQuery},
  "reviews": ${reviewsPaginationQuery},
  "defaultPosts": ${postsPaginationQuery},
  "specialPosts": ${postsByTagPaginationQuery('special')},
  "extraPosts": ${postsByTagPaginationQuery('extra')},
  "settings": ${settingsQuery},
  "category": ${categoryQuery},
  "top": ${topPaginationQuery}
}`

export interface Author {
  name?: string
  picture?: any
  bio?: string
  social?: Media[]
}

export interface Game {
  title?: string
  slug?: string
  cover?: any
  developer?: string
  release?: string
  genre?: string
}

export interface Media {
  _key: string
  media: string
  url: string
}

export interface Post {
  _id: string
  _type: string
  title?: string
  coverImage?: any
  showCover?: boolean
  date?: string
  _updatedAt?: string
  excerpt?: string
  author?: Author
  category?: Game & Category
  tag?: Tag[]
  slug?: string
  content?: any
  related?: Post[]
}

export interface Review {
  _id: string
  pros: string[]
  cons: string[]
  verdict: string
  grade: number
  slug?: string
  game?: Game
}

export interface Category {
  title?: string
  slug?: string
  description?: string
}

export interface Tag {
  title?: string
  slug?: string
  description?: string
}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
  social?: Media[]
}
