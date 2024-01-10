// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './Carousel.css'

import { Post } from 'lib/sanity.queries'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type CarouselType = {
  children: React.ReactNode
}

export function Carousel({ children }: CarouselType) {
  return (
    <>
      <Swiper
        pagination={{
          clickable: true,
        }}
        effect={'fade'}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        {children}
      </Swiper>
    </>
  )
}
