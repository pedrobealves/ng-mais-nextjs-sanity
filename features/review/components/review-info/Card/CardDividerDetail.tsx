import { tv, VariantProps } from 'tailwind-variants'

type CardProps = VariantProps<typeof detail>

const detail = tv({
  base: 'self-stretch h-4 rounded-3xl',
  variants: {
    color: {
      cons: 'bg-red-600',
      pros: 'bg-green-600',
    },
  },
})

export default function CardContainerGrade({ color }: CardProps) {
  return (
    <div className="w-full">
      {/*<span
        className={`w-full flex justify-center pb-1 font-extrabold ${
          color == 'pros' ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {color == 'pros' ? 'PRÓS' : 'CONTRAS'}
      </span>*/}
      <div className={detail({ color })}></div>
    </div>
  )
}
