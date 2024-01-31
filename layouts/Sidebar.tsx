type SidebarProps = {
  children: React.ReactNode
}

export default function Sidebar({ children }) {
  return (
    <aside className="flex lg:flex-col flex-row sm:flex-nowrap flex-wrap lg:max-w-col-3 w-full gap-4">
      {children}
    </aside>
  )
}
