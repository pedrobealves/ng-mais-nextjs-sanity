type CardProps = {
  title: string
}

export function CardTitle({ title }: CardProps) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-2xl text-primary-8 font-bold text-balance line-clamp-4">
        {title}
      </h3>
    </div>
  )
}
