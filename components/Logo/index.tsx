import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import logo from '/public/logo/logo.svg'

type LogoProps = {
  height?: number
  justify?: 'justify-start' | 'justify-center' | 'justify-end'
}

export function Logo({ height = 47, justify = 'justify-center' }: LogoProps) {
  return (
    <Link
      href="/"
      className={twMerge('flex items-center justify-center gap-3.5', justify)}
    >
      <Image height={height} priority src={logo} alt="Logo" />
    </Link>
  )
}
