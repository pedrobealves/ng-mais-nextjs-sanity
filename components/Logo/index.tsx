import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import logoDark from '/public/logo/logo-dark.svg'
import logoLight from '/public/logo/logo-light.svg'
import symbol from '/public/logo/symbol.svg'

type LogoProps = {
  heightSymbol?: number
  heightLogo?: number
  justify?: 'justify-start' | 'justify-center' | 'justify-end'
  isLight?: boolean
}

export function Logo({
  heightSymbol = 64,
  heightLogo = 50,
  justify = 'justify-center',
  isLight = false,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={twMerge('flex items-center justify-center gap-3.5', justify)}
    >
      <Image height={heightSymbol} priority src={symbol} alt="Symbol" />
      <Image
        height={heightLogo}
        priority
        src={isLight ? logoLight : logoDark}
        alt="Logo"
      />
    </Link>
  )
}
