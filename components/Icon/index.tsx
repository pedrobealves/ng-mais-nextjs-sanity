import { ElementType } from 'react'

interface IconProps {
  icon: ElementType
}

export default function Icon({ icon: Icon }: IconProps) {
  return <Icon className="hover:text-primary-5" />
}
