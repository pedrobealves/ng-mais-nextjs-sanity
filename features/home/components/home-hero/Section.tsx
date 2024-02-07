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
    <div className="flex flex-col basis-1/2 sm:gap-4 gap-2 w-full">
      <div className="flex sm:flex-row flex-col sm:gap-4 gap-2">{children}</div>
    </div>
  )
}
