import React, { Children } from 'react'

import styles from './Section.module.css'

type NewsProps = {
  category: string
}

export default function News({ category }: NewsProps) {
  return (
    <div className={`bg-white px-3 pt-2 rounded-t-xl ${styles.sectionTop}`}>
      <button className="flex items-center justify-center gap-2.5 rounded-full bg-primary-8 px-2 py-1 text-center font-[800] text-white text-xs leading-4">
        {category}
      </button>
    </div>
  )
}
