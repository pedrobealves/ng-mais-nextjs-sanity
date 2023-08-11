interface AuthorProps {
  children: React.ReactNode
}

export default function AuthorRoot({ children }: AuthorProps) {
  return (
    <div className="w-full flex font-body flex-col items-start gap-6 text-primary-8 border-t-2 border-gray-300 py-6">
      <div className="flex w-full items-center gap-3 self-stretch">
        {children}
      </div>
    </div>
  )
}
