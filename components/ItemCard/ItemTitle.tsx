type ItemProps = {
  title: string
}

export function ItemTitle({ title }: ItemProps) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-2xl text-primary-8 font-bold">{title}</h3>
    </div>
  )
}
