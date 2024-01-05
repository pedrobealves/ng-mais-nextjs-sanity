import { Post } from 'lib/sanity.queries'
import Image from 'next/image'

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
            <Image
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEihJTwSuR94bVtXoG7DzOcyO32kWpj3BbxMT4r7vbdohMFj3PP64IzoOg13HVb4YXYQXDPWUXMPHBWGi4SyHxyZYpPZwYMpKWBUeXL1QLujPnqwiLGToEI_3d-GvZa8ZqQGsq7CsVKNtRdY38ZMaBttQ6Vd_Po6sPmrHpba9UYjtSWESp5_ahSqpZaN9Us/s3840/clickwallpapers-elden-ring-game-wallpaper-in-4k-img1.jpg"
              alt="tensei-weekly"
              fill={true}
              sizes="(max-width: 564px) 100vw, 33vw"
            />
            <div className="absolute inset-0 [background:rgba(87,_23,_149,_0.30)]"></div>
            <div className="absolute inset-0 [background:linear-gradient(180deg,_rgba(0,_0,_0,_0.00)_0%,_rgba(0,_0,_0,_0.90)_100%)]"></div>
            <div className="absolute bottom-0 py-8 px-8 flex flex-col items-start justify-between self-stretch">
              <div className="flex flex-col items-start justify-end gap-2 self-stretch text-white">
                <div className="flex flex-col items-start justify-end self-stretch text-left gap-1 max-w-sm">
                  <p className="text-4xl font-bold">Weekly 1</p>
                  <p className="text-lg leading-6">
                    Resumo semanal com as principais notícias e tópicos mais
                    pertinentes
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
