type ItemProps = {
  author: string
}

export function ItemAuthor({ author }: ItemProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="pt-1 text-[12px] font-medium text-primary-9 uppercase">
        {' '}
        por {author}
      </p>
    </div>
  )
}
