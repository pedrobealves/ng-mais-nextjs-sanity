type CardProps = {
  title: string
}

export function CardTitle({ title }: CardProps) {
  return (
    <div className="flex items-center justify-between">
      <h4 className="text-2xl text-primary-8 font-bold">{title}</h4>
    </div>
  )
}
