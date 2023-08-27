type CardProps = {
  children: React.ReactNode
}

export default function CardContainerDetail({ children }: CardProps) {
  return (
    <div className="flex flex-wrap md:flex-row flex-col self-stretch justify-center items-start gap-x-3 gap-y-14">
      {children}
    </div>
  )
}
