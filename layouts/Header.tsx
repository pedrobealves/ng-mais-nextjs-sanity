import { Icon } from 'components/Icon'
import { LinkAction } from 'components/Link'
import { Logo } from 'components/Logo'
import { Search } from 'components/Search'
import { socialIconMap } from 'components/SocialIcon'
import { Media } from 'lib/sanity.queries'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState(null)

  useEffect(() => {
    let lastScrollY = window.pageYOffset

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset
      const direction = scrollY > lastScrollY ? 'down' : 'up'
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction)
      }
      lastScrollY = scrollY > 0 ? scrollY : 0
    }
    window.addEventListener('scroll', updateScrollDirection) // add event listener
    return () => {
      window.removeEventListener('scroll', updateScrollDirection) // clean up
    }
  }, [scrollDirection])

  return scrollDirection
}

export default function BlogHeader({
  title,
  description,
  level,
  social,
  hero,
}: {
  title?: string
  description?: any[]
  level: 1 | 2
  social: Media[]
  hero?: React.ReactNode
}) {
  const menu = [
    {
      name: 'Notícias',
      slug: '/news',
    },
    {
      name: 'Matérias',
      slug: '/post',
    },
    {
      name: 'Análises',
      slug: '/review',
    },
    {
      name: 'Artigos MIL',
      slug: '/post/special',
    },
  ]

  const scrollDirection = useScrollDirection()
  switch (level) {
    case 1:
      return (
        <header className="bg-gradient-header w-full px-4 rounded-b-[40px]">
          <nav className="container flex items-center justify-between mx-auto py-3">
            <Logo heightSymbol={106} heightLogo={64} isLight />

            <ul className="hidden lg:flex text-white font-semibold text-base gap-8">
              {menu?.map((item, index) => (
                <Link href={item.slug} key={index}>
                  <li className="block hover:text-secundary-4">{item.name}</li>
                </Link>
              ))}
            </ul>
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex gap-3">
                {social?.map((item) => (
                  <LinkAction key={item._key} url={item.url}>
                    <Icon
                      icon={socialIconMap[item.media]}
                      color="text-white"
                      hoverColor="hover:text-secundary-5"
                      size={16}
                    />
                  </LinkAction>
                ))}
              </div>
              <Search level={level} />
            </div>
          </nav>
          {hero}
        </header>
      )

    case 2:
      return (
        <header
          className={`fixed ${
            scrollDirection === 'down' ? '-top-24' : 'top-0'
          } bg-white w-full z-20 left-0 px-4 transition-all duration-500`}
        >
          <nav className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-1">
            <Logo />
            <ul className="hidden md:flex text-primary-8 font-semibold text-base gap-8">
              {menu?.map((item, index) => (
                <Link href={item.slug} key={index}>
                  <li className="block hover:text-primary-5">{item.name}</li>
                </Link>
              ))}
            </ul>
            <div className="hidden md:flex items-center gap-6">
              <div className="flex gap-3">
                {social?.map((item) => (
                  <LinkAction key={item._key} url={item.url}>
                    <Icon icon={socialIconMap[item.media]} size={16} />
                  </LinkAction>
                ))}
              </div>
              <Search level={level} />
            </div>
          </nav>
        </header>
      )

    default:
      throw new Error(
        `Invalid level: ${
          JSON.stringify(level) || typeof level
        }, only 1 or 2 are allowed`,
      )
  }
}
