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
    CardInfoSection:
      'absolute bottom-0 flex flex-col items-start justify-between self-stretch',
    CardTitle: 'font-bold',
    CardSubtitle: 'text-lg leading-6',
  },
  variants: {
    type: {
      review: {
        CardInfoSection: 'py-3 px-4',
        CardTitle: 'text-xl',
        CardSubtitle: 'hidden',
      },
      weekly: {
        CardInfoSection: 'py-8 px-8',
        CardTitle: 'text-4xl',
        CardSubtitle: '',
      },
    },
  },
})

export function Card({ type, title, subtitle, picture, slug }: CardProps) {
  const { CardInfoSection, CardTitle, CardSubtitle } = item({
    type,
  })

  return (
    <Link
      href={`/${type}/${slug}`}
      className="w-full font-inter h-[22rem] flex-col items-start justify-end gap-2.5 overflow-clip rounded-r-3xl rounded-tl-3xl drop-shadow-lg"
    >
      <Image
        src={
          picture?.asset?._ref
            ? urlForImage(picture).fit('crop').url()
            : 'https://source.unsplash.com/96x96/?face'
        }
        className="absolute inset-0 h-full w-full object-cover"
        width={858}
        height={1716}
        alt={picture?.alt ?? title}
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
