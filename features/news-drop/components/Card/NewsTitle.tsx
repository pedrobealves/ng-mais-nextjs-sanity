import React, { Children } from 'react'

type NewsProps = {
  title: string
  subtitle: string
}

export default function News({ title, subtitle }: NewsProps) {
  return (
    <div className="flex flex-col items-start justify-end self-stretch text-left">
      <p className="text-2xl font-[700] leading-8">{title}</p>
      <p className="text-sm font-[400] leading-5">{subtitle}</p>
    </div>
  )
}
