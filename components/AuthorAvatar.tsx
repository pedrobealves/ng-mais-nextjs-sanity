import { urlForImage } from 'lib/sanity.image'
import type { Author } from 'lib/sanity.queries'
import Image from 'next/image'

export default function AuthorAvatar(props: Author) {
  const { name, picture } = props
  return (
    <div className="flex justify-start items-center gap-3 pr-8">
      <Image
        src={
          picture?.asset?._ref
            ? urlForImage(picture).height(64).width(64).fit('crop').url()
            : 'https://source.unsplash.com/96x96/?face'
        }
        className="rounded-full"
        height={64}
        width={64}
        alt={picture.alt ?? name}
      />
      <div className="text-center text-primary-8 text-base font-bold leading-normal">
        {name}
      </div>
    </div>
  )
}
