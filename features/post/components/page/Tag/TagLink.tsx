import Link from 'next/link'

type TagLinkProps = {
  text: string
  slug: string
}

export function TagLink({ text, slug }: TagLinkProps) {
  return <Link href={`/tag/${slug}`}>{text}</Link>
}
