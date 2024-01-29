type SectionRootProps = {
  className?: string
  children: React.ReactNode
}

export function SectionRoot({ className, children }: SectionRootProps) {
  return <section className={`flex flex-col ${className}`}>{children}</section>
}
