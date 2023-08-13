import { Post, Review } from 'lib/sanity.queries'

type ReviewProps = {
  review: Review
}

export default function Review({ review }: ReviewProps) {
  return (
    <div className="flex px-5 md:px-8 pt-12 pb-5 md:pb-8 bg-primary-7 rounded-3xl flex-col justify-start items-center gap-14 w-full">
      <div className="flex items-center justify-center">
        <svg className="transform -rotate-90 w-48 h-48">
          <circle
            cx="96"
            cy="96"
            r="80"
            stroke="currentColor"
            stroke-width="18"
            fill="transparent"
            className="text-primary-6"
          />

          <circle
            cx="96"
            cy="96"
            r="80"
            stroke="currentColor"
            stroke-width="18"
            fill="transparent"
            stroke-linecap="round"
            stroke-dasharray="553"
            stroke-dashoffset="150"
            className="text-secundary-5"
          />
        </svg>
        <span className="absolute text-white text-6xl font-bold">
          {review.grade}
        </span>
      </div>
      <div className="flex flex-wrap md:flex-row flex-col self-stretch justify-center items-start gap-x-3 gap-y-14">
        <div className="flex flex-1 self-stretch flex-col justify-start items-center gap-9">
          <div className="self-stretch h-6 bg-green-600 rounded-3xl"></div>
          <div className="flex items-center">
            <div className="self-stretch flex-col items-start gap-3.5 flex">
              <div className="justify-start items-center gap-2.5 inline-flex">
                <div className="p-1.5 bg-green-600 rounded-full justify-start items-center flex">
                  <div className="w-4 h-4 relative"></div>
                </div>
                <div className="text-white md:text-xl text-lg font-normal leading-7">
                  Lorem ipsum ipldLor
                </div>
              </div>
              <div className="justify-start items-center gap-2.5 inline-flex">
                <div className="p-1.5 bg-green-600 rounded-full justify-start items-center flex">
                  <div className="w-4 h-4 relative"></div>
                </div>
                <div className="text-white md:text-xl text-lg font-normal leading-7">
                  Lorem ipsum ipldLorem
                </div>
              </div>
              <div className="justify-start items-center gap-2.5 inline-flex">
                <div className="p-1.5 bg-green-600 rounded-full justify-start items-center flex">
                  <div className="w-4 h-4 relative"></div>
                </div>
                <div className="text-white md:text-xl text-lg font-normal leading-7">
                  Lorem ipsum ipld
                </div>
              </div>
              <div className="justify-start items-center gap-2.5 inline-flex">
                <div className="p-1.5 bg-green-600 rounded-full justify-start items-center flex">
                  <div className="w-4 h-4 relative"></div>
                </div>
                <div className="text-white md:text-xl text-lg font-normal leading-7">
                  Lorem ipsum ipld
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 self-stretch flex-col justify-start items-center gap-9">
          <div className="self-stretch h-6 bg-red-600 rounded-3xl"></div>
          <div className="flex items-center">
            <div className="flex-col justify-start items-start gap-3.5 flex">
              <div className="justify-start items-center gap-2.5 inline-flex">
                <div className="p-1.5 bg-red-600 rounded-full justify-start items-center flex">
                  <div className="w-4 h-4 relative"></div>
                </div>
                <div className="text-white md:text-xl text-lg font-normal leading-7">
                  Lorem ipsum ipldassad
                </div>
              </div>
              <div className="justify-start items-center gap-2.5 inline-flex">
                <div className="p-1.5 bg-red-600 rounded-full justify-start items-center flex">
                  <div className="w-4 h-4 relative"></div>
                </div>
                <div className="text-white md:text-xl text-lg font-normal leading-7">
                  Lorem ipsum ipld
                </div>
              </div>
              <div className="justify-start items-center gap-2.5 inline-flex">
                <div className="p-1.5 bg-red-600 rounded-full justify-start items-center flex">
                  <div className="w-4 h-4 relative"></div>
                </div>
                <div className="text-white md:text-xl text-lg font-normal leading-7">
                  Lorem ipsum ipld
                </div>
              </div>
              <div className="justify-start items-center gap-2.5 inline-flex">
                <div className="p-1.5 bg-red-600 rounded-full justify-start items-center flex">
                  <div className="w-4 h-4 relative"></div>
                </div>
                <div className="text-white md:text-xl text-lg font-normal leading-7">
                  Lorem ipsum ipld
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex p-6 bg-[#170535] rounded-3xl flex-col justify-start items-start gap-2.5 w-full">
        <div className="text-white text-xl md:text-2xl font-bold leading-loose">
          Veredito
        </div>
        <div className="font-body text-lg leading-7.3 md:leading-7.5 md:text-1xl text-white font-normal">
          {review.verdict}
        </div>
      </div>
    </div>
  )
}
