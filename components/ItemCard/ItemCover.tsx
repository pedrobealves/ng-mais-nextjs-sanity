import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'

type ItemProps = {
  picture: any
  title: string
}

export function ItemCover({ picture, title }: ItemProps) {
  return (
    <>
      <Image
        src={
          picture?.asset?._ref
            ? urlForImage(picture).fit('crop').url()
            : 'https://source.unsplash.com/96x96/?face'
        }
        className="h-[140px] w-full object-cover"
        height={140}
        width={270}
        alt={picture?.alt ?? title}
      />
    </>
  )
}
