import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'

interface AuthorAvatarProps {
  name: string
  picture: any
}

export default function AuthorAvatar({ name, picture }: AuthorAvatarProps) {
  return (
    <div className="flex h-full items-start self-stretch py-1">
      <Image
        src={
          picture?.asset?._ref
            ? urlForImage(picture).height(70).width(70).fit('crop').url()
            : 'https://source.unsplash.com/96x96/?face'
        }
        className="rounded-full bg-cover bg-center"
        height={70}
        width={70}
        alt={picture?.alt ?? name}
      />
    </div>
  )
}
