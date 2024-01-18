import { format } from 'date-fns'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'

type CardProps = {
  input: React.ReactNode
  index: number
  title: string
  cover: any
  grade: number
  developer: string
  release: string
  genre: string
  slug: string
}

export function Card({
  input,
  index,
  title,
  cover,
  grade,
  developer,
  release,
  genre,
  slug,
}: CardProps) {
  return (
    <li className="flex flex-col gap-3">
      {input}
      <label
        htmlFor={'game' + index}
        className="flex gap-3 cursor-pointer peer-checked:[&>*:first-child]:text-2xl peer-checked:[&>*:first-child]:font-bold peer-checked:[&>*:first-child]:text-primary-5 peer-checked:[&_small]:block peer-checked:[&_p]:font-bold peer-checked:[&_p]:text-primary-5"
      >
        <span className="text-base font-normal text-primary-8">
          {index + 1}
        </span>
        <div className="flex flex-col">
          <p className="text-base font-normal text-primary-8">{title}</p>
          {genre && (
            <small className="hidden font-normal text-xs text-neutral-600">
              {genre}
            </small>
          )}
        </div>
      </label>
      <div className="peer-checked:h-40 h-0 transform overflow-hidden transition-all duration-500 ease-in">
        <Link href={`/review/${slug}`}>
          <div className="flex gap-5 transition-all duration-500 ease-in-out hover:bg-neutral-200 hover:rounded-xl cursor-pointer">
            <Image
              src={
                cover?.asset?._ref
                  ? urlForImage(cover).fit('crop').url()
                  : 'https://source.unsplash.com/96x96/?face'
              }
              className="max-h-full object-cover w-24 h-[8.5rem] rounded-xl  border-primary-5 border-2"
              width={192}
              height={272}
              alt={cover?.alt ?? title}
            />
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center text-lg font-extrabold text-white h-12 w-12 bg-primary-5 rounded-full">
                {grade}
              </div>
              <div className="flex flex-col gap-1">
                {release && (
                  <div className="flex flex-col font-normal text-xs text-neutral-600">
                    <span>Lançamento</span>
                    <span>{format(new Date(release), 'dd/MM/yyyy')}</span>
                  </div>
                )}
                {developer && (
                  <div className="flex flex-col font-normal text-xs text-neutral-600">
                    <span>Desenvolvedor</span>
                    <span>{developer}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </li>
  )
}
