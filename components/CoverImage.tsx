import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'

interface CoverImageProps {
  title: string
  slug?: string
  image: any
}

export default function CoverImage(props: CoverImageProps) {
  const { title, slug, image: source } = props
  const image = source?.asset?._ref ? (
    <Image
      className="rounded-xl"
      width={2000}
      height={1000}
      alt={`Cover Image for ${title}`}
      src={urlForImage(source).url()}
      sizes="100vw"
      quality={80}
      loading="lazy"
    />
  ) : (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  )

  return <div>{image}</div>
}
