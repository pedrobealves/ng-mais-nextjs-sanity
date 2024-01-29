import Link from 'next/link'

type CardProps = {
  children: React.ReactNode
  slug: string
  type: string
}

export function CardRoot({ children, slug, type }: CardProps) {
  return (
    <Link
      href={`/${type}/${slug}`}
      className="bg-white transition duration-30 overflow-hidden rounded-xl group"
    >
      {children}
    </Link>
  )
}
