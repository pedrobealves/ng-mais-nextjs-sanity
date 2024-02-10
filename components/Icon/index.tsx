import { ElementType } from 'react'
import { twMerge } from 'tailwind-merge'

export interface IconProps {
  hoverColor?: string
  color?: string
  size?: number
  className?: string
}

interface IconPropsType extends IconProps {
  icon: ElementType
}

export function Icon({
  icon: Icon,
  color = 'text-primary-8',
  hoverColor = 'hover:text-secundary-5',
  className = '',
  size = 24,
}: IconPropsType) {
  return <Icon className={twMerge(color, hoverColor, className)} size={size} />
}
