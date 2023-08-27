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

import {
  PortableText,
  type PortableTextReactComponents,
} from '@portabletext/react'
import { CloudinaryImage } from 'components/CloudinaryImage'
import { SanityImage } from 'components/SanityImage'
import getYouTubeId from 'get-youtube-id'
import Image from 'next/image'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'

import styles from './PostBody.module.css'

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />
    },
    imageEmbed: ({ value }) => {
      return <CloudinaryImage {...value} />
    },
    youtube: ({ value }) => {
      const { url } = value
      const id = getYouTubeId(url)
      return <LiteYouTubeEmbed title={url} id={id} />
    },
  },
}

export default function PostBody({ content }) {
  return (
    <div className={`${styles.portableText}`}>
      <PortableText value={content} components={myPortableTextComponents} />
    </div>
  )
}
