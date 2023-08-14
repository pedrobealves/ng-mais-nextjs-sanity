import { tv, VariantProps } from 'tailwind-variants'

type CardProps = VariantProps<typeof detail>

const detail = tv({
  base: 'self-stretch h-6 rounded-3xl',
  variants: {
    color: {
      cons: 'bg-red-600',
      pros: 'bg-green-600',
    },
  },
})

export default function CardContainerGrade({ color }: CardProps) {
  return <div className={detail({ color })}></div>
}
