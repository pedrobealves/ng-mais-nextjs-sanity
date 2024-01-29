import React, { Children } from 'react'

type NewsProps = {
  children: React.ReactNode
}

export default function News({ children }: NewsProps) {
  return (
    <div className="w-full relative font-inter h-72 flex-col items-start justify-end gap-2.5 overflow-hidden rounded-3xl">
      {children}
    </div>
  )
}
