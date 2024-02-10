import { Icon } from 'components/Icon'
import Link from 'components/Link'
import { Logo } from 'components/Logo'
import { Search } from 'components/Search'
import { socialIconMap } from 'components/SocialIcon'
import { headerNavLinks, subMenuHeaderNavLinks } from 'data/headerNavLinks'
import { Media } from 'lib/sanity.queries'
import { tv } from 'tailwind-variants'

import { Dropdown } from './Dropdown'
import { DropdownContent } from './DropdownContent'
import { MenuItem } from './MenuItem'
import { NavMobile } from './NavMobile'

type NavType = {
  level: 1 | 2
  social: Media[]
}

const item = tv({
  slots: {
    Nav: 'flex items-center justify-between mx-auto rounded-[48px] bg-white px-4 py-3 z-40',
  },
  variants: {
    level: {
      1: {
        Nav: 'container',
      },
      2: {
        Nav: 'max-w-screen-xl',
      },
    },
  },
})

export function NavBar({ level, social }: NavType) {
  const { Nav } = item({
    level,
  })

  return (
    <nav className={Nav()}>
      <Logo />
      <ul className="hidden lg:flex text-primary-8 font-bold text-base gap-4">
        {headerNavLinks?.map((item, index) => (
          <MenuItem key={index} href={item.slug}>
            {item.name}
          </MenuItem>
        ))}
        <Dropdown content={<DropdownContent menu={subMenuHeaderNavLinks} />}>
          Mais
        </Dropdown>
      </ul>
      <div className="hidden lg:flex items-center gap-6">
        <div className="flex gap-3">
          {social?.map((item) => (
            <Link
              key={item._key}
              href={item.url}
              aria-label={`Ir ao ${item.media} do website`}
            >
              <Icon
                icon={socialIconMap(item.media)}
                color="text-primary-8"
                hoverColor="hover:text-secundary-5"
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
