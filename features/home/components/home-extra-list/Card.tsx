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
        <div className="flex flex-col gap-2 px-2 justify-center w-full">
          <h1 className="text-primary-8 font-bold text-base text-pretty">
            {title}
          </h1>
        </div>
        <Image
          src={
            picture?.asset?._ref
              ? urlForImage(picture).fit('crop').width(96).height(160).url()
              : 'https://source.unsplash.com/96x96/?face'
          }
          className="min-h-[10rem] w-24 max-h-full object-cover rounded-2xl"
          width={96}
          height={160}
          quality={80}
          alt={`Imagem de ${picture?.alt ?? title}`}
        />
      </Link>
    </li>
  )
}
