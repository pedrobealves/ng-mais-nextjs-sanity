type CardProps = {
  children: React.ReactNode
}

export function CardSection({ children }: CardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl z-50 justify-between bg-white relative px-6 pt-5 pb-6 -mt-3 h-[calc(100%-128px)]">
      {children}
    </div>
  )
}
