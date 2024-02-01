import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'

type CardProps = {
  title: string
  picture: any
  slug: string
}

export function Card({ title, picture, slug }: CardProps) {
  return (
    <li>
      <Link
        href={`/post/${slug}`}
        className="flex flex-row bg-white p-2 rounded-[20px]"
      >
        <div className="flex flex-col gap-2 px-3 justify-center w-full">
          <hr className="w-5 h-[2px] border-0 bg-primary-8" />
          <h1 className="text-primary-8 font-bold text-base">{title}</h1>
        </div>
        <Image
          src={
            picture?.asset?._ref
              ? urlForImage(picture).fit('crop').url()
              : 'https://source.unsplash.com/96x96/?face'
          }
          className="min-h-[10rem] w-24 max-h-full object-cover rounded-2xl"
          width={392}
          height={196}
          alt={picture?.alt ?? title}
        />
      </Link>
    </li>
  )
}
