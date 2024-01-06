import React, { useState } from 'react'

type SpoilerButtonType = {
  children: React.ReactNode
}

export function SpoilerButton({ children }: SpoilerButtonType) {
  const [showSpoiler, setShowSpoiler] = useState(false)

  const toggleSpoiler = () => {
    setShowSpoiler(!showSpoiler)
  }

  return (
    <span className="group flex flex-col items-center">
      <button
        className={`hide border-2 border-secundary-5 font-medium	 px-4 py-1 uppercase text-secundary-5 text-1xl ${
          showSpoiler ? 'hidden' : 'block'
        }`}
        onClick={toggleSpoiler}
        type="button"
      >
        Clique para ver o spoiler
      </button>
      <span className={`spoiler ${showSpoiler ? 'block' : 'hidden'}`}>
        {children}
      </span>
    </span>
  )
}
