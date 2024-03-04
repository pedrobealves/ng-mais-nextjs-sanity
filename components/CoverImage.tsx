import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'

interface CoverImageProps {
  title: string
  slug?: string
  image: any
  priority?: boolean
}

export default function CoverImage(props: CoverImageProps) {
  const { title, slug, image: source, priority } = props
  const image = source?.asset?._ref ? (
    <Image
      className="rounded-xl"
      width={2000}
      height={1000}
      alt={`Cover Image for ${title}`}
      src={urlForImage(source).url()}
      sizes="100vw"
      quality={80}
      priority={priority}
    />
  ) : (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  )

  return <div>{image}</div>
}
