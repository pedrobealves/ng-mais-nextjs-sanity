import { Post } from 'lib/sanity.queries'
import post from 'schemas/post'

import { Section } from './Section'

type HeroProps = {
  reviews: Post[]
}

export function Hero({ reviews }: HeroProps) {
  return (
    <section className="container flex-col lg:flex-row mx-auto flex w-full pt-12 pb-32 gap-6">
      <div className="flex flex-col basis-1/2 gap-4 w-full">
        <div className="flex justify-start items-center gap-4">
          <div className="w-2 h-9 bg-white rounded-tr-[5px] rounded-br-[5px]"></div>
          <div className="text-center text-white text-2xl font-extrabold leading-loose">
            TenseiWeekly
          </div>
        </div>
        <div className="flex sm:flex-row flex-col gap-6">
          <div className="w-full font-inter h-[22rem] flex-col items-start justify-end gap-2.5 overflow-clip rounded-r-3xl rounded-tl-3xl drop-shadow-lg">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src="https://cdn2.tfx.company/images/clickwallpapers-elden-ring-game-wallpaper-in-4k-img1.jpg"
              alt="Flower and sky"
            />
            <div className="absolute inset-0 [background:rgba(87,_23,_149,_0.30)]"></div>
            <div className="absolute inset-0 [background:linear-gradient(180deg,_rgba(0,_0,_0,_0.00)_0%,_rgba(0,_0,_0,_0.90)_100%)]"></div>
            <div className="absolute bottom-0 py-8 px-8 flex flex-col items-start justify-between self-stretch">
              <div className="flex flex-col items-start justify-end gap-2 self-stretch text-white">
                <div className="flex flex-col items-start justify-end self-stretch text-left gap-1 max-w-sm">
                  <p className="text-4xl font-bold">Weekly 2</p>
                  <p className="text-lg leading-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Section posts={reviews} type="review" />
    </section>
  )
}
