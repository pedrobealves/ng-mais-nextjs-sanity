import Link from 'components/Link'

export function DropdownContent({ menu }) {
  return (
    <div className="w-64 bg-gray-200 p-6 shadow-xl rounded-3xl">
      {menu?.map((item, index) => (
        <div className="mb-3 space-y-3" key={index}>
          <h3 className="font-bold">{item.name}</h3>
          {item.submenu.map((subitem, index) => (
            <Link
              key={index}
              href={subitem.slug}
              className="font-normal block text-sm hover:underline"
            >
              {subitem.name}
            </Link>
          ))}
        </div>
      ))}
      <button className="mt-3 w-full rounded-2xl border-2 border-primary-8 px-4 py-2 font-semibold transition-colors hover:bg-primary-8 hover:text-white">
        Contato
      </button>
    </div>
  )
}
