type SidebarProps = {
  children: React.ReactNode
}

export default function Sidebar({ children }) {
  return (
    <aside className="flex lg:flex-col flex-row sm:flex-nowrap flex-wrap lg:max-w-col-3 w-full border-l-2 border-l-gray-100 gap-10">
      {children}
    </aside>
  )
}
