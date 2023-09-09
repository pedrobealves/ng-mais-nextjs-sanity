import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
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
        !toggle ? 'ring-2 ring-secundary-4 bg-white' : 'bg-transparent',
        'flex justify-between',
        level === 1 ? 'rounded-[32px]' : 'rounded-[30px]',
      )}
    >
      <input
        type="text"
        className={twMerge(
          toggle && 'hidden',
          'max-w-[8rem] w-full pl-6 pr-4 font-medium outline-none',
          level === 1 ? 'rounded-[32px]' : 'rounded-[30px]',
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
        className={twMerge(
          !toggle && (level === 1 ? 'm-2' : 'm-1'),
          'text-white bg-secundary-4 rounded-3xl p-4',
        )}
        onClick={() => setToggle(!toggle)}
      >
        <Image priority src={search} alt="Search" />
      </button>
    </form>
  )
}
