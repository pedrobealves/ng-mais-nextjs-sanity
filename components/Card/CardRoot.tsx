import Link from 'next/link'

type CardProps = {
  children: React.ReactNode
  slug: string
}

export function CardRoot({ children, slug }: CardProps) {
  return (
    <Link
      href={`/news/${slug}`}
      className="bg-white transition duration-30 drop-shadow-xl hover:drop-shadow-2xl overflow-hidden rounded-xl group"
    >
      {children}
    </Link>
  )
}
