import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa6'

type DropdownProps = {
  children: React.ReactNode
  content: React.ReactNode
}

export function Dropdown({ children, content }: DropdownProps) {
  const [open, setOpen] = useState(false)

  const show = content && open

  return (
    <div className="flex justify-center py-2 px-2">
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="relative w-fit h-fit"
      >
        <div className="relative text-primary-8 cursor-pointer">
          <div className="flex items-center gap-2">
            {children}
            <span
              className={`${
                open
                  ? `rotate-[-180deg] -mr-1`
                  : `rotate-0 fill-[#212529]  dark:fill-white`
              } fill-primary-8 transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
            >
              <FaChevronDown size={10} />
            </span>
          </div>
          <span
            style={{
              transform: open ? 'scaleX(1)' : 'scaleX(0)',
            }}
            className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-primary-8 transition-transform duration-300 ease-out"
          />
        </div>
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              style={{ translateX: '-50%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute left-1/2 top-12 bg-white text-black z-50 rounded-3xl"
            >
              <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
              <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gray-200" />
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
