type TagRootProps = {
  children: React.ReactNode
}

export function TagRoot({ children }) {
  return (
    <div className="text-xl text-primary-8 font-bold">
      <span>TAGS:</span> {children}
    </div>
  )
}
