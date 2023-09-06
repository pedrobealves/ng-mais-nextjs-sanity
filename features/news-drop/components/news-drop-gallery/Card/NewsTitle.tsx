import React, { Children } from 'react'

type NewsProps = {
  title: string
  subtitle: string
  index: number
}

export default function News({ title, subtitle, index }: NewsProps) {
  return (
    <div className="flex flex-col items-start justify-end self-stretch text-left">
      <h3 className="text-2xl font-[700] leading-8">{title}</h3>
      <p className="text-sm font-[400] leading-5">
        {title.length > 40 && index > 0
          ? subtitle.substring(0, 50) + '...'
          : subtitle}
      </p>
    </div>
  )
}
