import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { twMerge } from 'tailwind-merge'

import search from '/public/icon/Search.svg'

type SearchProps = {
  level: number
}

export function Search({ level }: SearchProps) {
  const router = useRouter()
  const [toggle, setToggle] = useState(true)
  const [searchInput, setSearchInput] = useState('')

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/search?q=${searchInput}`)
    setSearchInput('')
  }

  return (
    <form
      name="search-form"
      data-name="Search Form"
      id="search-form"
      aria-label="Search Form"
      onSubmit={handleFormSubmit}
      className={twMerge(
        !toggle ? 'ring-2 ring-secundary-5' : 'bg-transparent',
        'flex justify-between',
        'rounded-[30px]',
      )}
    >
      <input
        type="text"
        className={twMerge(
          toggle && 'hidden',
          'max-w-[8rem] w-full pl-6 pr-4 font-medium outline-none ',
          'rounded-[30px]',
        )}
        placeholder="Procurar"
        value={searchInput}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchInput(e.target.value)
        }
        required
      />
      <button
        type="button"
        aria-label="Procurar"
        className="text-white bg-secundary-4 rounded-3xl p-4"
        onClick={() => setToggle(!toggle)}
      >
        {toggle ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21.0004 20.9999L16.6504 16.6499"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <CgClose className="stroke-2 stroke-white" size={24} />
        )}
      </button>
    </form>
  )
}
