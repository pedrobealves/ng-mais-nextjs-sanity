import styles from './Section.module.css'

type SectionTitleProps = {
  children: string
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <div className="flex justify-start items-center">
      <div
        className={`text-center text-primary-8 text-2xl font-extrabold leading-loose py-2 px-8 bg-gray-200 rounded-t-[24px] ${styles.section} `}
      >
        {children}
      </div>
    </div>
  )
}
