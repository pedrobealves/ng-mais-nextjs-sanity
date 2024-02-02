import { Icon } from 'components/Icon'
import Link from 'components/Link'
import { Logo } from 'components/Logo'
import { Search } from 'components/Search'
import { socialIconMap } from 'components/SocialIcon'
import headerNavLinks from 'data/headerNavLinks'
import { Media } from 'lib/sanity.queries'
import { tv } from 'tailwind-variants'

import { NavMobile } from './NavMobile'

type NavType = {
  level: 1 | 2
  social: Media[]
}

const item = tv({
  slots: {
    Nav: 'flex items-center justify-between mx-auto rounded-[48px] bg-white px-4 py-3 z-40',
    Menu: 'hidden lg:flex text-primary-8 font-bold text-base gap-4',
    MenuList:
      'block py-2 px-2 rounded-md decoration-[3px] hover:underline underline-offset-[4px] transition-all duration-300 ease-in-out',
    IconColor: 'text-primary-8',
    IconHoverColor: 'hover:text-secundary-5',
    LogoHeight: '',
    SymbolHeight: '',
  },
  variants: {
    level: {
      1: {
        Nav: 'container',
        Menu: '',
        MenuList: '',
        IconColor: '',
        IconHoverColor: '',
      },
      2: {
        Nav: 'max-w-screen-xl',
        Menu: '',
        MenuList: '',
        IconColor: '',
        IconHoverColor: '',
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
      <Logo />
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
