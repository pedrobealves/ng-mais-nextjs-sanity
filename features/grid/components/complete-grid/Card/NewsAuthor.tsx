import React, { Children } from 'react'

type NewsProps = {
  author: string
}

export default function News({ author }: NewsProps) {
  let name = author.split(' ')[0]

  return (
    <div className="flex items-center justify-center gap-2.5 font-bold rounded-full bg-gray-200 px-3 py-1 text-primary-8">
      <button className="text-sm leading-5">{name}</button>
    </div>
  )
}
