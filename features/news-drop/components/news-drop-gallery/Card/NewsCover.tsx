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
      <div className="absolute inset-0 [background-image:linear-gradient(180deg,_rgba(90,_24,_154,_0),_rgba(78,_21,_133,_0.86)_86%,_rgba(90,_24,_154,_1))]"></div>
      <div className="absolute inset-0 bg-[#5A189A1A]"></div>
    </>
  )
}
