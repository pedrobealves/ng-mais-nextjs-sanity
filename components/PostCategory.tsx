import Date from 'components/PostDate'

export default function PostCategory({ date }) {
  return (
    <div className="flex items-center justify-center gap-2.5 text-center font-[700] opacity-60">
      <div className="flex items-center justify-center gap-2.5 rounded-full bg-gray-200 px-3 py-1 text-primary-5">
        <button className="text-sm leading-5">Categoria</button>
      </div>
      <p className="text-sm leading-5 text-gray-500 capitalize">
        <Date dateString={date} />
      </p>
    </div>
  )
}
