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
      className="break-inside-avoid	mb-4 overflow-clip flex flex-col text-center bg-white rounded-lg gap-4"
    >
      {children}
    </Link>
  )
}
