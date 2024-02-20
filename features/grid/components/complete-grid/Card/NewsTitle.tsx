import React from 'react'

type NewsProps = {
  title: string
  subtitle: string
  index: number
}

export default function News({ title, subtitle, index }: NewsProps) {
  return (
    <div className="flex flex-col items-start justify-end self-stretch text-left bg-white rounded-r-xl p-4">
      <h3 className="text-2xl font-[700] leading-8 text-balance">{title}</h3>
      <p className="text-sm font-[400] leading-5 max-h-10 top-0 text-pretty overflow-hidden">
        {subtitle}
      </p>
    </div>
  )
}
