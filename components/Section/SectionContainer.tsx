type SectionContainerProps = {
  children: React.ReactNode
}

export function SectionContainer({ children }: SectionContainerProps) {
  return (
    <div className="flex flex-col bg-gray-200 md:gap-4 gap-2 md:px-4 px-2 md:py-4 py-2 md:rounded-r-3xl rounded-br-3xl rounded-bl-3xl w-full">
      {children}
    </div>
  )
}
