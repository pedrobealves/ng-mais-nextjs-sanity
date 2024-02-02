import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'

type NewsProps = {
  picture: any
  title: string
}

export default function News({ picture, title }: NewsProps) {
  return (
    <>
      <Image
        src={
          picture?.asset?._ref
            ? urlForImage(picture).fit('crop').url()
            : 'https://source.unsplash.com/96x96/?face'
        }
        className="absolute inset-0 h-full w-full object-cover"
        width={564}
        height={1104}
        alt={picture?.alt ?? title}
      />
      <div className="absolute inset-0 [background-image:linear-gradient(180deg,_rgba(11,_0,_29,_0),_rgba(11,_0,_29,_0.86)_86%,_rgba(11,_0,_29,_1))]"></div>
      <div className="absolute inset-0 bg-[#0B001D1A]"></div>
    </>
  )
}