import { NavBar } from 'components/NavBar'
import { Media } from 'lib/sanity.queries'
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
  const scrollDirection = useScrollDirection()
  switch (level) {
    case 1:
      return (
        <header className="bg-gray-200 w-full px-4 py-4 rounded-b-[40px]">
          <NavBar level={level} social={social} />
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
          <NavBar level={level} social={social} />
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
