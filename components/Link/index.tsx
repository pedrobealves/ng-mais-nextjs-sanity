import Link from 'next/link'

interface LinkProps {
  children: React.ReactNode
  url: string
}

export default function LinkIcon({ children, url }: LinkProps) {
  return (
    <Link href={url} target="_blank" passHref>
      {children}
    </Link>
  )
}
