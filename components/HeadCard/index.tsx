export function HeadCard({ title }) {
  return (
    <div className="flex w-full h-56 rounded-[36px] justify-center items-center bg-gradient-to-r from-primary-8 via-primary-9 to-primary-8">
      <h1 className="text-white font-extrabold text-5xl">{title}</h1>
    </div>
  )
}
