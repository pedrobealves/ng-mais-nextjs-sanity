type SectionRootProps = {
  className?: string
  children: React.ReactNode
}

export function SectionRoot({ className = '', children }: SectionRootProps) {
  return (
    <section className={`flex flex-col items-start m-2 ${className}`}>
      {children}
    </section>
  )
}
