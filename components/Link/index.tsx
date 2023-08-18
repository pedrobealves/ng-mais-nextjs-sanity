import Link from 'next/link'

interface LinkProps {
  children: React.ReactNode
  url: string
  test?: string
}

export function LinkAction({ children, url, test }: LinkProps) {
  return (
    <Link href={url} target="_blank" passHref>
      {children}
    </Link>
  )
}
