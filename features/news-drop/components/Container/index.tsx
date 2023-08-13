import React from 'react'

interface NewsProps {
  children: React.ReactNode
}

export default function News({ children }: NewsProps) {
  return (
    <aside aria-label="Related articles" className="px-4">
      <div className="flex flex-col items-start max-w-screen-xl mx-auto w-full gap-10 pt-12">
        {children}
      </div>
    </aside>
  )
}
