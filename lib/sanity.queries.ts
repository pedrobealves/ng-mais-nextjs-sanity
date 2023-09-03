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

export const newsDropQuery = groq`
*[_type == "news" && drop == true] | order(date desc, _updatedAt desc) [0...3] {
  category[0]->{title, "slug": slug.current},
  ${postFields}
}
`

export const settingsQuery = groq`*[_type == "settings"][0]`

export const postIndexQuery = groq`
{
"defaultPosts": *[_type == "post" && type == 'default'] | order(date desc, _updatedAt desc)[0..2] {
  type,
  "category": game->{title, "slug": slug.current, cover},
  ${postFields}
},
"specialPosts": *[_type == "post" && type == 'special'] | order(date desc, _updatedAt desc)[0..4] {
  type,
  "category": game->{title, "slug": slug.current, cover},
  ${postFields}
}
}
`

export const newsIndexQuery = groq`
*[_type == "news"] | order(date desc, _updatedAt desc)[0..5] {
  category[0]->{title, "slug": slug.current},
  ${postFields}
}`

export const reviewsIndexQuery = groq`
*[_type == "review"] | order(date desc, _updatedAt desc)[0..2] {
  "category": game->{title, "slug": slug.current},
  ${postFields}
}`

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    "author": author->{name, picture, bio, social},
    "category": game->{title, "slug": slug.current},
    ${postFields}
  },
  "newsDrop": ${newsDropQuery}
}`

export const newsAndMoreStoriesQuery = groq`
{
  "news": *[_type == "news" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    "author": author->{name, picture, bio, social},
    category[0]->{title, "slug": slug.current},
    ${postFields}
  },
  "newsDrop": ${newsDropQuery}
}`

export const reviewAndMoreStoriesQuery = groq`
{
  "review": *[_type == "review" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    "author": author->{name, picture, bio, social},
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

export const newsBySlugQuery = groq`
*[_type == "news" && slug.current == $slug][0] {
  ${postFields}
}
`

export const reviewBySlugQuery = groq`
*[_type == "review" && slug.current == $slug][0] {
  ${postFields}
}
`

export const topIndexQuery = groq`
*[_type == "review"] | order(grade desc, _updatedAt desc)[0..2] {
  grade,
  "slug": slug.current,
  game->{title, "slug": slug.current, cover, release, developer, genre},
}
`

type TypePost = 'default' | 'special'

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
  date?: string
  _updatedAt?: string
  excerpt?: string
  author?: Author
  category?: Game & Category
  slug?: string
  content?: any
  type?: TypePost
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

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
  social?: Media[]
}
