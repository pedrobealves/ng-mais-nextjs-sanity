import React, { Children } from 'react'

import styles from './Section.module.css'

type NewsProps = {
  children: React.ReactNode
}

export default function News({ children }: NewsProps) {
  return (
    <div
      className={`flex flex-row bg-white px-3 py-2 gap-4 rounded-b-xl ${styles.sectionBottom}`}
    >
      {children}
    </div>
  )
}
