import Link from 'components/Link'
import React, { useState } from 'react'

type MenuItemProps = {
  children: React.ReactNode
  href: string
}

export function MenuItem({ children, href }: MenuItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <li className="flex justify-center py-2 px-2">
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="relative w-fit h-fit"
      >
        <Link href={href} className="relative font-bold text-primary-8">
          {children}
          <span
            style={{
              transform: open ? 'scaleX(1)' : 'scaleX(0)',
            }}
            className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-primary-8 transition-transform duration-300 ease-out"
          />
        </Link>
      </div>
    </li>
  )
}
