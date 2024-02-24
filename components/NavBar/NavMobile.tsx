import Link from 'components/Link'
import { headerNavLinks, subMenuHeaderNavLinks } from 'data/headerNavLinks'
import { useState } from 'react'

import { Accordion } from './Accordion'

type NavType = {
  level: 1 | 2
}

export function NavMobile({ level }: NavType) {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <>
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="lg:hidden py-4 px-2"
        type="button"
      >
        <svg
          width="32"
          height="16"
          viewBox="0 0 32 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-primary-8"
        >
          <g clipPath="url(#clip0_1145_2232)">
            <path d="M32 13.7143C32 14.9786 30.9786 16 29.7143 16H2.28571C1.02143 16 0 14.9786 0 13.7143C0 12.45 1.02143 11.4286 2.28571 11.4286H29.7143C30.9786 11.4286 32 12.45 32 13.7143Z" />
            <path d="M0 2.28571C0 1.02143 1.02143 0 2.28571 0H29.7143C30.9786 0 32 1.02143 32 2.28571C32 3.55 30.9786 4.57143 29.7143 4.57143H2.28571C1.02143 4.57143 0 3.55 0 2.28571Z" />
          </g>
          <defs>
            <clipPath id="clip0_1145_2232">
              <rect width="32" height="16" />
            </clipPath>
          </defs>
        </svg>
      </button>
      <div
        className={`fixed left-0 top-0 z-10 h-full w-full transform duration-300 ease-in-out bg-primary-8 opacity-[0.98] ${
          navShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end">
          <button
            className={`h-8 w-8 ${level == 1 ? 'mr-6 mt-11' : 'mr-5 mt-6'}`}
            aria-label="Toggle Menu"
            onClick={onToggleNav}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-gray-100"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <nav className="fixed mt-8 h-full">
          {headerNavLinks.map((link) => (
            <div key={link.name} className="px-12 py-4">
              <Link
                href={link.slug}
                className="text-2xl font-bold tracking-widest text-gray-100"
                onClick={onToggleNav}
              >
                {link.name}
              </Link>
            </div>
          ))}
          <Accordion
            content={subMenuHeaderNavLinks}
            onToggleNav={onToggleNav}
          />
          <div className="px-12 py-4">
            <Link
              href="/search"
              className="text-2xl font-bold tracking-widest text-gray-100"
              onClick={onToggleNav}
            >
              Pesquisar
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
