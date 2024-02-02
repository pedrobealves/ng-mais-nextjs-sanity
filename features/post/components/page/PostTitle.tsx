interface PostTitleProps {
  children: string
}

export default function PostTitle({ children }: PostTitleProps) {
  return (
    <h1 className="text-4xl md:text-6xl font-bold text-primary-8 mb-6 sm:break-normal break-words break-all">
      {children}
    </h1>
  )
}
