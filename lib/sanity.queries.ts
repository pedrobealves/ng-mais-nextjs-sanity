import { groq } from 'next-sanity'

const postFields = groq`
  _id,
  _type,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  "slug": slug.current,
`

const newsDropQuery = groq`
*[_type == "news" && drop == true] | order(date desc, _updatedAt desc) [0...3] {
  category[0]->{title, "slug": slug.current},
  ${postFields}
}
`

export const settingsQuery = groq`*[_type == "settings"][0]`

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    "author": author->{name, picture, bio, twitter, facebook},
    "category": game->{title, "slug": slug.current},
    ${postFields}
  },
  "newsDrop": ${newsDropQuery}
}`

export const newsAndMoreStoriesQuery = groq`
{
  "news": *[_type == "news" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    "author": author->{name, picture, bio, twitter, facebook},
    category[0]->{title, "slug": slug.current},
    ${postFields}
  },
  "newsDrop": ${newsDropQuery}
}`

export const reviewAndMoreStoriesQuery = groq`
{
  "review": *[_type == "review" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    "author": author->{name, picture, bio, twitter, facebook},
    "category": game->{title, "slug": slug.current},
    ${postFields}
  },
  "reviewDetails": *[_type == "review" && slug.current == $slug] | order(_updatedAt desc) [0] {
    _id,
    pros,
    cons,
    verdict,
    grade,
  },
  "newsDrop": ${newsDropQuery}
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const newsSlugsQuery = groq`
*[_type == "news" && defined(slug.current)][].slug.current
`

export const reviewSlugsQuery = groq`
*[_type == "review" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

export interface Author {
  name?: string
  picture?: any
  bio?: string
  twitter?: string
  facebook?: string
}

export interface Game {
  title?: string
  slug?: string
}

export interface Post {
  _id: string
  _type: string
  title?: string
  coverImage?: any
  date?: string
  _updatedAt?: string
  excerpt?: string
  author?: Author
  category?: Game & Category
  slug?: string
  content?: any
}

export interface Review {
  _id: string
  pros: string[]
  cons: string[]
  verdict: string
  grade: number
}

export interface Category {
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
}
