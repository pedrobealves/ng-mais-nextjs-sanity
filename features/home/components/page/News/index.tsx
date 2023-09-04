import { Card } from 'components/Card'
import { ca } from 'date-fns/locale'
import type { Category, Post } from 'lib/sanity.queries'

type NewsProps = {
  news: Post[]
  categories: Category[]
}

export function NewsSection({ news, categories }: NewsProps) {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex justify-start items-center gap-4">
        <div className="w-2 h-9 bg-primary-5 rounded-tr-[5px] rounded-br-[5px]"></div>
        <div className="text-center text-primary-5 text-2xl font-extrabold leading-loose">
          Notícias
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button className="px-4 py-3 rounded-full bg-primary-5 font-bold text-white drop-shadow-xl">
          Todas notícias
        </button>
        {categories?.map((category, index) => (
          <button
            key={index}
            className="px-4 py-3 rounded-full bg-white font-bold text-primary-5 drop-shadow-lg hover:drop-shadow-none hover:bg-gray-200"
          >
            {category.title}
          </button>
        ))}
      </div>
      <div className="flex flex-col sm:auto-rows-fr lg:grid-cols-3 sm:grid sm:grid-cols-2 gap-6">
        {news?.map((item) => (
          <Card.Root slug={item.slug} key={item._id}>
            <Card.Cover picture={item.coverImage} title={item.title} />
            <Card.Section>
              <div className="flex flex-col gap-3">
                <Card.Category
                  category={item.category.title}
                  dateString={item.date}
                />
                <Card.Title title={item.title} />
              </div>
              <Card.ReadMore />
            </Card.Section>
          </Card.Root>
        ))}
      </div>
      <div className="flex bg-gray-200 h-16 mx-auto rounded-lg overflow-clip drop-shadow-xl group/close">
        <button className="flex items-center justify-center w-11 fill-primary-5 bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M432-48 0-480l432-432 103 103-329 329 329 329L432-48Z" />
          </svg>
        </button>
        <button className="hidden group-hover:flex items-center justify-center w-11 fill-primary-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="m256-168-88-88 224-224-224-224 88-88 224 224 224-224 88 88-224 224 224 224-88 88-224-224-224 224Z" />
          </svg>
        </button>
        <div className="group/open flex px-6 font-bold overflow-hidden text-primary-5 items-center cursor-pointer">
          <div className="group-focus/open:hidden">Page 1</div>
          <div className="hidden group-focus/open:flex gap-2">
            <button className="bg-gray-300 px-[10px] py-1 text-primary-5 font-bold rounded-lg">
              1
            </button>
            <button className="bg-gray-100 px-[10px] py-1 text-primary-5 font-bold rounded-lg">
              2
            </button>
            <button className="bg-gray-100 px-[10px] py-1 text-primary-5 font-bold rounded-lg">
              3
            </button>
            <button className="bg-gray-100 px-[10px] py-1 text-primary-5 font-bold rounded-lg">
              4
            </button>
            <span>...</span>
            <button className="bg-gray-100 px-[10px] py-1 text-primary-5 font-bold rounded-lg">
              6
            </button>
          </div>
        </div>
        <button className="flex items-center justify-center w-11 fill-primary-5 bg-gray-100">
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
    </section>
  )
}
