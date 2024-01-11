export function CardReadMore() {
  return (
    <div className="flex items-center">
      <span className="underline underline-offset-[3px] font-bold text-primary-8 opacity-40 group-hover:opacity-100 transition duration-500 ease-out">
        Leia Agora
      </span>
      <div className="pl-16 scale-x-50 transition duration-500 opaease-out group-hover:translate-x-14 group-hover:opacity-100 opacity-0 group-hover:scale-x-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1.2em"
          viewBox="0 0 448 512"
        >
          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
        </svg>
      </div>
    </div>
  )
}
