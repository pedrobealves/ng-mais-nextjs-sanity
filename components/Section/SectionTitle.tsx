import styles from './Section.module.css'

type SectionTitleProps = {
  children: string
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <div
      className={`md:text-center text-primary-8 text-2xl font-extrabold leading-loose pt-2 md:px-8 px-4 bg-gray-200 md:rounded-t-[24px] rounded-t-xl md:w-fit w-full ${styles.section} `}
    >
      {children}
    </div>
  )
}
