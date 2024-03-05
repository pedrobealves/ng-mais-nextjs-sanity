import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { getSanityImageConfig } from 'lib/sanity.client'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'

interface Props {
  url: string
  alt: string
  caption?: string
}

export const EmbedImage = (props: Props) => {
  const { url, alt, caption } = props

  if (!props) return null

  return (
    <figure>
      <Image
        src={`${url}`}
        alt={alt}
        width={800}
        height={800}
        loading="lazy"
        sizes="(max-width: 800px) 100vw, 800px"
      />
      {caption && (
        <figcaption className="mt-2 text-center italic text-sm text-gray-500 dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
