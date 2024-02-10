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
  "author": author->{name, picture, bio, social},
  game->{title, "slug": slug.current, cover, release, developer, genre},
  category->{title, "slug": slug.current, _type},
  tag[]->{title, "slug": slug.current, _type},
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

const tagQuery = (filter: string = '') => groq`
*[tag[0]._ref in *[_type=="tag"]._id ${filter}][0...6].tag[]->{_id, title, "slug": slug.current}
`

export const newsDropPaginationQuery = groq`
*[_type in ["news", "post", "review"] && drop == true] | order(date desc, _updatedAt desc) [$pageIndex...$limit] {
  category[0]->{title, "slug": slug.current},
  ${postFields}
}
`

//Posts

export const typeQuery = (type: string) => groq`
*[_type == "${type}"] | order(date desc, _updatedAt desc) {
  ...,
  "slug": slug.current,
  ${['news', 'post', 'review'].includes(type) ? postFields : ''}
}`

export const typesQuery = (types: string[]) => groq`
*[_type in ${JSON.stringify(types)}] | order(date desc, _updatedAt desc) {
  ...,
  "slug": slug.current,
}`

export const postsByTagPaginationQuery = (tag: string) => groq`
*["${tag}" in tag[]->slug.current ] | order(date desc, _updatedAt desc)[$pageIndex...$limit] {
  ${postFields}
}`

export const postsByCategoryPaginationQuery = (category: string) => groq`
*["${category}" == category->slug.current ] | order(date desc, _updatedAt desc)[$pageIndex...$limit] {
  ${postFields}
}`

export const postsPaginationQuery = (type: string) => groq`
*[_type == "${type}"] | order(date desc, _updatedAt desc)[$pageIndex...$limit] {
  ${postFields}
}`

export const postsPaginationFilterQuery = (filter: string) => groq`
*[${filter}] | order(date desc, _updatedAt desc)[$pageIndex...$limit] {
  ...,
  ${postFields}
}`

export const postAndMoreStoriesQuery = (type: string) => groq`
{
  "post": *[_type == "${type}" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
    ${type == 'review' ? reviewDetails : ''}
    ${type == 'news' ? relatedByTag(type) : relatedByCategory(type)}
  }
}`

export const postSlugsQuery = (type: string) => groq`
*[_type == "${type}" && defined(slug.current)][].slug.current`

export const postTitleBySlugQuery = () => groq`
*[slug.current == $slug && defined(slug.current)][0].title`

export const typeBySlugQuery = (type: string) => groq`
*[_type == "${type}" && slug.current == $slug][0] {
  ...
}
`

const reviewDetails = groq`
    pros,
    cons,
    verdict,
    grade,
`

//index

export const indexQuery = groq`
{
  "news": ${postsPaginationQuery('news')},
  "reviews": ${postsPaginationQuery('review')},
  "defaultPosts": ${postsByCategoryPaginationQuery('article')},
  "specialPosts": ${postsByCategoryPaginationQuery('special')},
  "extraPosts": ${postsByCategoryPaginationQuery('extra')},
  "chronologyPosts": ${postsByCategoryPaginationQuery('chronology')},
  "settings": ${settingsQuery},
  "category": ${tagQuery('&&  _type == "news"')},
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
  _createdAt?: string
  _updatedAt?: string
  excerpt?: string
  author?: Author
  category?: Category
  tag?: Tag[]
  slug?: string
  content?: any
  related?: Post[]
  pros?: string[]
  cons?: string[]
  verdict?: string
  grade?: number
  game?: Game
}

export interface Category {
  title?: string
  slug?: string
  description?: string
  _type: string
  _updatedAt?: string
}

export interface Tag {
  title?: string
  slug?: string
  description?: string
  _type: string
  _updatedAt?: string
}

interface LinkTree {
  _key: string
  title: string
  url: string
}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
  social?: Media[]
  linktree?: LinkTree[]
}
