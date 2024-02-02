type ItemProps = {
  category: string
}

export function ItemCategory({ category }: ItemProps) {
  const truncate = (input) =>
    input?.length > 10 ? `${input.substring(0, 10)}...` : input

  return (
    <div className="flex justify-between items-center">
      <button className="bg-gray-200 rounded-full text-xs font-extrabold px-2 py-1 uppercase text-primary-8">
        {truncate(category)}
      </button>
    </div>
  )
}
