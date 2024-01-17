type CardProps = {
  children: React.ReactNode
}

export default function CardRoot({ children }: CardProps) {
  return (
    <div className="flex px-0 md:px-8 pt-12 pb-5 md:pb-8 flex-col justify-start items-center gap-14 w-full">
      {children}
    </div>
  )
}
