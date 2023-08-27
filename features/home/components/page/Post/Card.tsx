import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'
import { tv, VariantProps } from 'tailwind-variants'

type CardProps = {
  title: string
  subtitle?: string
  picture: any
  coverGame?: any
  slug: string
} & VariantProps<typeof item>

const item = tv({
  slots: {
    rootCard:
      'w-full font-inter flex-col items-start justify-end gap-2.5 overflow-clip drop-shadow-xl',
    sectionCard:
      'md:absolute relative bottom-0 flex md:flex-row gap-3 items-end w-full',
    coverGameCard: 'rounded-xl border-white',
    infoSectionCard: 'flex flex-col bg-white rounded-r-xl rounded-bl-xl w-full',
    titleCard: 'text-primary-5 font-bold',
    subTitleCard: '',
  },
  variants: {
    size: {
      small: {
        rootCard: 'h-auto rounded-[20px]',
        sectionCard: 'p-2',
        coverGameCard: 'h-24 border-2 w-16',
        infoSectionCard: 'p-2',
        titleCard: 'text-base',
        subTitleCard: 'hidden',
      },
      big: {
        rootCard: 'md:h-72 rounded-3xl',
        sectionCard: 'p-3',
        coverGameCard: 'h-40 border-4 w-28',
        infoSectionCard: 'p-4',
        titleCard: 'text-2xl',
        subTitleCard: 'text-primary-5 hidden md:block',
      },
    },
  },
})

export function Card({
  size,
  title,
  subtitle,
  coverGame,
  picture,
  slug,
}: CardProps) {
  const {
    rootCard,
    sectionCard,
    coverGameCard,
    infoSectionCard,
    titleCard,
    subTitleCard,
  } = item({
    size,
  })

  return (
    <Link href={`/post/${slug}`} className={rootCard()}>
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
      <div className="absolute inset-0 [background-image:linear-gradient(180deg,_rgba(90,_24,_154,_0.00)_0%,_rgba(90,_24,_154,_0.90)_82.96%)]"></div>
      <div className={sectionCard()}>
        {coverGame && (
          <Image
            src={
              coverGame?.asset?._ref
                ? urlForImage(coverGame).fit('crop').url()
                : 'https://source.unsplash.com/96x96/?face'
            }
            className={coverGameCard()}
            width={112}
            height={144}
            alt={coverGame?.alt ?? title}
          />
        )}
        <div className={infoSectionCard()}>
          <h3 className={titleCard()}>{title}</h3>
          <p className={subTitleCard()}>{subtitle}</p>
        </div>
      </div>
    </Link>
  )
}
