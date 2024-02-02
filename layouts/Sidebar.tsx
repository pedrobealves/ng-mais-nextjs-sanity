type SidebarProps = {
  children: React.ReactNode
}

export default function Sidebar({ children }) {
  return (
    <aside className="flex lg:flex-col flex-row lg:col-span-3 col-span-full w-full gap-4 md:flex-nowrap flex-wrap">
      {children}
    </aside>
  )
}
