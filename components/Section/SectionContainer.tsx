type SectionContainerProps = {
  children: React.ReactNode
}

export function SectionContainer({ children }: SectionContainerProps) {
  return (
    <div className="flex flex-col bg-gray-200 gap-4 px-4 py-4 rounded-r-3xl rounded-bl-3xl w-full">
      {children}
    </div>
  )
}
