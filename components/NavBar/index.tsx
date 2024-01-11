import { Icon } from 'components/Icon'
import Link from 'components/Link'
import { Logo } from 'components/Logo'
import { Search } from 'components/Search'
import { socialIconMap } from 'components/SocialIcon'
import headerNavLinks from 'data/headerNavLinks'
import { it } from 'date-fns/locale'
import { Media } from 'lib/sanity.queries'
import Image from 'next/image'
import bars from 'public/icon/bars-2.svg'
import { tv } from 'tailwind-variants'

import { NavMobile } from './NavMobile'

type NavType = {
  level: 1 | 2
  social: Media[]
}

const item = tv({
  slots: {
    Nav: '',
    Menu: '',
    MenuList: 'block py-2 px-2 rounded-md',
    IconColor: '',
    IconHoverColor: '',
    LogoHeight: '',
    SymbolHeight: '',
  },
  variants: {
    level: {
      1: {
        Nav: 'container flex items-center justify-between mx-auto py-3',
        Menu: 'hidden lg:flex text-white font-semibold text-base gap-4',
        MenuList:
          'hover:bg-white/5 decoration-[3px] hover:underline underline-offset-[4px] transition-all duration-300 ease-in-out',
        IconColor: 'text-white',
        IconHoverColor: 'hover:text-secundary-5',
        LogoHeight: '64',
        SymbolHeight: '106',
      },
      2: {
        Nav: 'max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-1',
        Menu: 'hidden lg:flex text-primary-8 font-semibold text-base gap-4',
        MenuList:
          'hover:bg-primary-8/10 decoration-[3px] hover:underline underline-offset-[4px] transition-all duration-300 ease-in-out',
        IconColor: 'text-primary-8',
        IconHoverColor: 'hover:text-primary-5',
      },
    },
  },
})

export function NavBar({ level, social }: NavType) {
  const {
    Nav,
    Menu,
    MenuList,
    IconColor,
    IconHoverColor,
    LogoHeight,
    SymbolHeight,
  } = item({
    level,
  })

  return (
    <nav className={Nav()}>
      <Logo
        heightSymbol={Number(SymbolHeight())}
        heightLogo={Number(LogoHeight())}
        isLight={level == 1}
      />

      <ul className={Menu()}>
        {headerNavLinks?.map((item, index) => (
          <Link href={item.slug} key={index}>
            <li className={MenuList()}>{item.name}</li>
          </Link>
        ))}
      </ul>
      <div className="hidden lg:flex items-center gap-6">
        <div className="flex gap-3">
          {social?.map((item) => (
            <Link key={item._key} href={item.url}>
              <Icon
                icon={socialIconMap(item.media)}
                color={IconColor()}
                hoverColor={IconHoverColor()}
                size={16}
              />
            </Link>
          ))}
        </div>
        <Search level={level} />
      </div>
      <NavMobile level={level} />
    </nav>
  )
}
