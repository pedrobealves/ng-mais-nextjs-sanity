import Link from 'next/link'

type ItemProps = {
  children: React.ReactNode
  slug: string
  type: string
}

export function ItemRoot({ children, slug, type }: ItemProps) {
  return (
    <Link
      href={`/${type}/${slug}`}
      className="overflow-clip flex flex-col text-center bg-white rounded-lg gap-4"
    >
      {children}
    </Link>
  )
}
