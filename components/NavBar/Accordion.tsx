import Link from 'components/Link'
import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

export function Accordion({ content, onToggleNav }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col gap-3">
      <input
        id={'game'}
        value={'game'}
        className="peer hidden"
        type="checkbox"
        name="top"
        checked={isOpen}
        onChange={() => setIsOpen(!isOpen)}
      />
      <label htmlFor={'game'}>
        <div className="flex flex-row items-center px-12 pt-4 text-2xl font-bold tracking-widest cursor-pointer text-white gap-2">
          Mais
          <span
            className={`${
              isOpen ? `rotate-[-180deg] -mr-1` : `rotate-0 fill-white`
            } fill-primary-8 transition-transform duration-200 ease-in-out motion-reduce:transition-none`}
          >
            <FaChevronDown size={12} />
          </span>
        </div>
      </label>
      <div className="peer-checked:h-fit h-0 transform overflow-hidden transition-all duration-500 ease-in">
        {content.map((link) => (
          <div key={link.name}>
            {link.submenu.map((subitem, index) => (
              <div key={subitem.name} className="px-16 py-2">
                <Link
                  href={subitem.slug}
                  className="text-2xl font-medium tracking-widest text-gray-100"
                  onClick={onToggleNav}
                >
                  {subitem.name}
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
