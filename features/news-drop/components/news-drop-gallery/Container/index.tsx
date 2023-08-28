import React from 'react'

interface NewsProps {
  children: React.ReactNode
}

export default function News({ children }: NewsProps) {
  return (
    <div className="flex flex-col items-start max-w-screen-xl mx-auto w-full gap-10">
      {children}
    </div>
  )
}
