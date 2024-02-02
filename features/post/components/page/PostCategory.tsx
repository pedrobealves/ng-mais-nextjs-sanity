import Link from 'components/Link'

import Date from './PostDate'

type CategoryProps = {
  date: string
  text: string
  slug?: string
}

export default function PostCategory({ date, text, slug }: CategoryProps) {
  return (
    <div className="flex items-center justify-center gap-2.5 text-center font-[700] opacity-60">
      <Link href={`/${slug}`}>
        <div className="flex items-center justify-center gap-2.5 rounded-full bg-gray-200 px-3 py-1 text-primary-8">
          <button className="text-sm leading-5">{text}</button>
        </div>
      </Link>
      <p className="text-sm leading-5 text-gray-500 first-letter:capitalize">
        <Date dateString={date} />
      </p>
    </div>
  )
}
