type PaginationProps = {
  handleNextPage: () => void
  handlePrevPage: () => void
  isFirstPage: boolean
  isLastPage: boolean
  pageIndex: number
}

export function Pagination({
  handleNextPage,
  handlePrevPage,
  isFirstPage,
  isLastPage,
  pageIndex,
}: PaginationProps) {
  return (
    <div className="flex bg-white h-16 rounded-lg overflow-clip">
      <button
        disabled={isFirstPage}
        onClick={handlePrevPage}
        className="flex items-center justify-center w-11 fill-primary-8 bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M432-48 0-480l432-432 103 103-329 329 329 329L432-48Z" />
        </svg>
      </button>
      <button className="hidden items-center justify-center w-11 fill-primary-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="m256-168-88-88 224-224-224-224 88-88 224 224 224-224 88 88-224 224 224 224-88 88-224-224-224 224Z" />
        </svg>
      </button>
      <div className="flex px-6 font-bold overflow-hidden text-primary-8 items-center cursor-pointer">
        <div className="">Página {pageIndex}</div>
        <div className="hidden gap-2">
          <button className="bg-gray-300 px-[10px] py-1 text-primary-8 font-bold rounded-lg">
            1
          </button>
          <button className="bg-gray-100 px-[10px] py-1 text-primary-8 font-bold rounded-lg">
            2
          </button>
          <button className="bg-gray-100 px-[10px] py-1 text-primary-8 font-bold rounded-lg">
            3
          </button>
          <button className="bg-gray-100 px-[10px] py-1 text-primary-8 font-bold rounded-lg">
            4
          </button>
          <span>...</span>
          <button className="bg-gray-100 px-[10px] py-1 text-primary-8 font-bold rounded-lg">
            6
          </button>
        </div>
      </div>
      <button
        onClick={handleNextPage}
        disabled={isLastPage}
        className="flex items-center justify-center w-11 fill-primary-8 bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M321-48 218-151l329-329-329-329 103-103 432 432L321-48Z" />
        </svg>
      </button>
    </div>
  )
}
