import React, { Children } from 'react'

type NewsProps = {
  category: string
}

export default function News({ category }: NewsProps) {
  return (
    <div className="absolute flex items-center justify-center gap-2.5 rounded-full bg-white px-2 py-1 text-center font-[800] text-[#3C096C] drop-shadow-lg mx-6 my-4">
      <p className="text-xs leading-4">{category}</p>
    </div>
  )
}
