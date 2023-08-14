type CardProps = {
  verdict: string
}

export default function CardContainerGrade({ verdict }: CardProps) {
  return (
    <div className="flex p-6 bg-[#170535] rounded-3xl flex-col justify-start items-start gap-2.5 w-full">
      <div className="text-white text-xl md:text-2xl font-bold leading-loose">
        Veredito
      </div>
      <div className="font-body text-lg leading-7.3 md:leading-7.5 md:text-1xl text-white font-normal">
        {verdict}
      </div>
    </div>
  )
}
