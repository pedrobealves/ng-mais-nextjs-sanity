'use client'

import { IconContext } from 'react-icons'

interface AuthorProps {
  children: React.ReactNode
}

export default function AuthorIcons({ children }: AuthorProps) {
  return (
    <div className="flex items-center gap-5">
      <IconContext.Provider value={{ size: '24' }}>
        {children}
      </IconContext.Provider>
    </div>
  )
}
