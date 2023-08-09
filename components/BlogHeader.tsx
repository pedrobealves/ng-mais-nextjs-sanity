import { PortableText } from '@portabletext/react'
import { FaFacebook } from '@react-icons/all-files/fa/FaFacebook'
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram'
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter'
import { IoLogoTiktok } from '@react-icons/all-files/io5/IoLogoTiktok'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import search from './../public/icon/Search.svg'
import logo from './../public/logo/logo.svg'
import symbol from './../public/logo/symbol.svg'
import styles from './BlogHeader.module.css'

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
          className={`fixed top-0 ${
            scrollDirection === 'down' ? '-top-24' : 'top-0'
          } bg-white w-full z-20 left-0 px-4 transition-all duration-500`}
        >
          <nav className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-1">
            <a href="#" className="flex items-center justify-center gap-3.5">
              <Image priority src={symbol} alt="Symbol" />
              <Image priority src={logo} alt="Logo" />
            </a>
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
              <div className="flex gap-3 text-primary-8">
                <a href="" target="_blank">
                  <FaTwitter className="hover:text-primary-5" />
                </a>
                <a href="" target="_blank">
                  <FaFacebook className="hover:text-primary-5" />
                </a>
                <a href="" target="_blank">
                  <FaInstagram className="hover:text-primary-5" />
                </a>

                <a href="" target="_blank">
                  <IoLogoTiktok className="hover:text-primary-5" />
                </a>
              </div>
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
