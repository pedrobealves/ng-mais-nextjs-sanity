interface TitleProps {
  children: string
}

export default function TitleSection({ children }: TitleProps) {
  return (
    <div className="flex justify-start items-center gap-4">
      <div className="w-2 h-9 bg-purple-950 rounded-tr-[5px] rounded-br-[5px]"></div>
      <div className="text-center text-purple-950 text-2xl font-extrabold leading-loose">
        {children}
      </div>
    </div>
  )
}
