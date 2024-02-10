import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'

type CardProps = {
  picture: any
  title: string
}

export function CardCover({ picture, title }: CardProps) {
  return (
    <>
      <Image
        src={
          picture?.asset?._ref
            ? urlForImage(picture).fit('crop').width(286).height(140).url()
            : 'https://source.unsplash.com/96x96/?face'
        }
        className="sm:h-[140px] h-32 w-full object-cover"
        height={140}
        width={286}
        quality={80}
        alt={picture?.alt ?? title}
      />
    </>
  )
}
