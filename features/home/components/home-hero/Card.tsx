import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'
import { tv, VariantProps } from 'tailwind-variants'

type CardProps = {
  title: string
  subtitle?: string
  picture: any
  slug: string
  index: number
} & VariantProps<typeof item>

const item = tv({
  slots: {
    CardLink: 'sm:h-80 h-44',
    CardInfoSection:
      'absolute bottom-0 flex flex-col items-start justify-between self-stretch',
    CardTitle: 'font-bold text-balance',
    CardSubtitle: 'text-lg leading-6 text-balance',
  },
  variants: {
    type: {
      review: {
        CardLink:
          'w-full font-inter flex-col items-start justify-end gap-2.5 overflow-clip rounded-r-3xl rounded-tl-3xl drop-shadow-lg ',
        CardInfoSection: 'py-3 px-4',
        CardTitle: 'text-xl',
        CardSubtitle: 'hidden',
      },
      post: {
        CardLink: '',
        CardInfoSection: 'py-8 sm:px-8 px-4',
        CardTitle: 'sm:text-4xl sm:mb-0 text-xl mb-6 line-clamp-4',
        CardSubtitle: 'sm:block hidden sm:line-clamp-3',
      },
    },
  },
})

export function Card({
  type,
  title,
  subtitle,
  picture,
  slug,
  index,
}: CardProps) {
  const { CardInfoSection, CardTitle, CardSubtitle, CardLink } = item({
    type,
  })

  const widthCover = type === 'review' ? 288 : 592

  return (
    <Link href={`/${type}/${slug}`} className={CardLink()}>
      <Image
        src={
          picture?.asset?._ref
            ? urlForImage(picture)
                .fit('crop')
                .width(widthCover)
                .height(320)
                .url()
            : 'https://source.unsplash.com/96x96/?face'
        }
        className="object-cover w-full h-full"
        width={widthCover}
        height={320}
        priority={index == 0 || type === 'review'}
        quality={80}
        alt={`Imagem de ${picture?.alt ?? title}`}
      />
      <div className="absolute inset-0 [background:rgba(87,_23,_149,_0.30)]"></div>
      <div className="absolute inset-0 [background:linear-gradient(180deg,_rgba(0,_0,_0,_0.00)_0%,_rgba(0,_0,_0,_0.90)_100%)]"></div>
      <div className={CardInfoSection()}>
        <div className="flex flex-col items-start justify-end gap-2 self-stretch text-white">
          <div className="flex flex-col items-start justify-end self-stretch text-left gap-1 max-w-sm">
            <p className={CardTitle()}>{title}</p>
            <p className={CardSubtitle()}>{subtitle}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
