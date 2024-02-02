import React, { Children } from 'react'

type NewsProps = {
  children: React.ReactNode
}

export default function News({ children }: NewsProps) {
  return (
    <div className="absolute bottom-0 py-4 px-6 flex flex-col items-start justify-between self-stretch">
      <div className="flex flex-col items-start justify-end self-stretch text-primary-8">
        {children}
      </div>
    </div>
  )
}
