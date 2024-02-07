import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'
import { tv, VariantProps } from 'tailwind-variants'

type CardProps = {
  title: string
  subtitle?: string
  picture: any
  slug: string
} & VariantProps<typeof item>

const item = tv({
  slots: {
    CardLink: 'sm:h-80 h-44',
    CardInfoSection:
      'absolute bottom-0 flex flex-col items-start justify-between self-stretch',
    CardTitle: 'font-bold',
    CardSubtitle: 'text-lg leading-6',
  },
  variants: {
    type: {
      review: {
        CardLink:
          'w-full font-inter flex-col items-start justify-end gap-2.5 overflow-clip rounded-r-3xl rounded-tl-3xl drop-shadow-lg',
        CardInfoSection: 'py-3 px-4',
        CardTitle: 'text-xl',
        CardSubtitle: 'hidden',
      },
      post: {
        CardLink: '',
        CardInfoSection: 'py-8 px-8',
        CardTitle: 'sm:text-4xl sm:pb-0 text-2xl pb-5',
        CardSubtitle: 'sm:block hidden',
      },
    },
  },
})

export function Card({ type, title, subtitle, picture, slug }: CardProps) {
  const { CardInfoSection, CardTitle, CardSubtitle, CardLink } = item({
    type,
  })

  return (
    <Link href={`/${type}/${slug}`} className={CardLink()}>
      <Image
        src={
          picture?.asset?._ref
            ? urlForImage(picture).fit('crop').url()
            : 'https://source.unsplash.com/96x96/?face'
        }
        className="object-cover w-full h-full"
        width={560}
        height={320}
        priority={true}
        sizes="(max-width: 56,px) 100vw, 33vw"
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
