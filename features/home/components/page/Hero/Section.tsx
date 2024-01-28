import { urlForImage } from 'lib/sanity.image'
import { Post } from 'lib/sanity.queries'
import Image from 'next/image'
import Link from 'next/link'
import { tv, VariantProps } from 'tailwind-variants'

type CardProps = {
  children: React.ReactNode
}

export function Section({ children }: CardProps) {
  return (
    <div className="flex flex-col basis-1/2 gap-4 w-full">
      <div className="flex sm:flex-row flex-col gap-4">{children}</div>
    </div>
  )
}
