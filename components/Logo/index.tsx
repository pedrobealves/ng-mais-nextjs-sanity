import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import logo from '/public/logo/logo.svg'
import logoMobile from '/public/logo/logo-mobile.svg'

type LogoProps = {
  height?: number
  justify?: 'justify-start' | 'justify-center' | 'justify-end'
}

export function Logo({ height = 48, justify = 'justify-center' }: LogoProps) {
  return (
    <Link
      href="/"
      className={twMerge('flex items-center justify-center gap-3.5', justify)}
    >
      <Image
        height={height}
        src={logo}
        alt="Logo"
        className="hidden md:block"
      />
      <Image
        height={height}
        src={logoMobile}
        alt="Logo"
        className="block md:hidden"
      />
    </Link>
  )
}
