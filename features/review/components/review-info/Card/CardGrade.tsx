type CardProps = {
  grade: number
}

export default function CardContainerGrade({ grade }: CardProps) {
  const circumference = ((2 * 22) / 7) * 80

  return (
    <div className="flex items-center justify-center">
      <svg className="transform -rotate-90 w-48 h-48">
        <circle
          cx="96"
          cy="96"
          r="80"
          stroke="currentColor"
          strokeWidth="16"
          fill="transparent"
          className="text-gray-200"
        />

        <circle
          cx="96"
          cy="96"
          r="80"
          stroke="currentColor"
          strokeWidth="22"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * ((100 - grade) / 100)}
          className="text-secundary-5"
        />
      </svg>
      <div className="absolute flex flex-col justify-center items-center gap-1">
        <span className=" text-primary-7 text-6xl font-bold">{grade}</span>
        <span className="uppercase text-gray-400 text-base">DE 100</span>
      </div>
    </div>
  )
}
