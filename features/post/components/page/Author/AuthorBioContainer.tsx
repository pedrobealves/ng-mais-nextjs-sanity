interface AuthorProps {
  children: React.ReactNode
}

export default function AuthorBioContainer({ children }: AuthorProps) {
  return (
    <div className="flex flex-col items-start justify-center gap-6 [flex-grow:1]">
      {children}
    </div>
  )
}
