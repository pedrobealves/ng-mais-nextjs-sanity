import { PortableText } from '@portabletext/react'
import { Logo } from 'components/Logo'
import { Social } from 'components/Social'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import search from '/public/icon/Search.svg'

import styles from './Header.module.css'

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
}: {
  title: string
  description?: any[]
  level: 1 | 2
}) {
  const scrollDirection = useScrollDirection()

  switch (level) {
    case 1:
      return (
        <header className="mb-10 mt-16 flex flex-col items-center md:mb-12 md:flex-row md:justify-between">
          <h1 className="text-6xl font-bold leading-tight tracking-tighter md:pr-8 md:text-8xl">
            {title}
          </h1>
          <h4
            className={`mt-5 text-center text-lg md:pl-8 md:text-left ${styles.portableText}`}
          >
            <PortableText value={description} />
          </h4>
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
              <li>
                <a
                  href="#"
                  className="block hover:text-primary-5"
                  aria-current="page"
                >
                  Análises
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block hover:text-primary-5"
                  aria-current="page"
                >
                  Notícias
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block hover:text-primary-5"
                  aria-current="page"
                >
                  Matérias
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block hover:text-primary-5"
                  aria-current="page"
                >
                  Weekly
                </a>
              </li>
            </ul>
            <div className="hidden md:flex items-center gap-6">
              <Social />
              <button
                type="button"
                className="text-white bg-secundary-4 rounded-3xl p-4"
              >
                <Image priority src={search} alt="Search" />
              </button>
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
