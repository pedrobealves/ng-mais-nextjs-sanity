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
          strokeWidth="18"
          fill="transparent"
          className="text-primary-6"
        />

        <circle
          cx="96"
          cy="96"
          r="80"
          stroke="currentColor"
          strokeWidth="18"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * ((100 - grade) / 100)}
          className="text-secundary-5"
        />
      </svg>
      <span className="absolute text-white text-6xl font-bold">{grade}</span>
    </div>
  )
}
