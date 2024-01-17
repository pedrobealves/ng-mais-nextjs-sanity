import { ElementType } from 'react'
import { IconContext, IconType } from 'react-icons'
import { tv, VariantProps } from 'tailwind-variants'

type CardProps = {
  text: string
  icon: ElementType
} & VariantProps<typeof item>

const item = tv({
  base: 'p-1.5 rounded-full justify-start items-center flex',
  variants: {
    color: {
      cons: 'bg-red-600',
      pros: 'bg-green-600',
    },
  },
})

export default function CardContainerGrade({
  text,
  color,
  icon: Icon,
}: CardProps) {
  return (
    <div className="justify-start items-center gap-2.5 inline-flex">
      <div className={item({ color })}>
        <div className="flex items-center justify-center w-3 h-3">
          <Icon className="text-white" />
        </div>
      </div>
      <div className="text-primary-8 md:text-xl text-lg font-normal leading-7">
        {text}
      </div>
    </div>
  )
}
