'use client'

/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import 'react-medium-image-zoom/dist/styles.css'

import {
  PortableText,
  type PortableTextReactComponents,
} from '@portabletext/react'
import { EmbedImage } from 'components/EmbedImage'
import { SanityImage } from 'components/SanityImage'
import getYouTubeId from 'get-youtube-id'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import Zoom from 'react-medium-image-zoom'
import { TwitterTweetEmbed } from 'react-twitter-embed'

import { SpoilerButton } from '../page/SpoilerButton'
import { IntersectionObserver } from './IntersectionObserver'
import styles from './PostBody.module.css'

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    html: ({ value }) => {
      return (
        <IntersectionObserver>
          <div
            className={`${styles.bodyHtml}`}
            dangerouslySetInnerHTML={{ __html: value.code }}
          ></div>
        </IntersectionObserver>
      )
    },
    spoilerContent: ({ value }) => {
      return (
        <SpoilerButton>
          <PortableText
            value={value.content}
            components={myPortableTextComponents}
          />
        </SpoilerButton>
      )
    },
    image: ({ value }) => {
      return (
        <Zoom>
          <SanityImage {...value} />
        </Zoom>
      )
    },
    imageEmbed: ({ value }) => {
      return (
        <Zoom>
          <EmbedImage {...value} />
        </Zoom>
      )
    },
    youtube: ({ value }) => {
      const { url } = value
      const id = getYouTubeId(url)
      return (
        <IntersectionObserver>
          <LiteYouTubeEmbed title={url} id={id} />{' '}
        </IntersectionObserver>
      )
    },
    twitter: ({ value }) => {
      const { id } = value || {}

      if (!id) {
        return (
          <div>
            <p>Tweet-ID mangler</p>
          </div>
        )
      }

      return (
        <IntersectionObserver>
          <TwitterTweetEmbed options={{ align: 'center' }} tweetId={id} />
        </IntersectionObserver>
      )
    },
  },
}

export function PostBody({ content }) {
  return (
    <div className={`${styles.portableText}`}>
      <PortableText value={content} components={myPortableTextComponents} />
    </div>
  )
}
