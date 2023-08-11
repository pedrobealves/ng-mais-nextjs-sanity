import React from 'react'

interface NewsProps {
  children: React.ReactNode
}

export default function News() {
  return (
    <div className="w-full font-inter h-72 flex-col items-start justify-end gap-2.5 overflow-clip rounded-3xl drop-shadow-lg">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src="https://image.api.playstation.com/vulcan/ap/rnd/202105/1417/HM9fBpwxGcon3lbajBIpHcWk.png"
        alt="Flower and sky"
      />
      <div className="absolute inset-0 [background-image:linear-gradient(180deg,_rgba(90,_24,_154,_0),_rgba(78,_21,_133,_0.86)_86%,_rgba(90,_24,_154,_1))]"></div>
      <div className="absolute inset-0 bg-[#5A189A1A]"></div>
      <div className="absolute flex items-center justify-center gap-2.5 rounded-full bg-white px-2 py-1 text-center font-[800] text-[#3C096C] drop-shadow-lg mx-6 my-4">
        <p className="text-xs leading-4">CATEGORIA</p>
      </div>
      <div className="absolute bottom-0 py-4 px-6 flex flex-col items-start justify-between self-stretch">
        <div className="flex flex-col items-start justify-end gap-2 self-stretch text-white">
          <div className="flex flex-col items-start justify-end self-stretch text-left">
            <p className="text-2xl font-[700] leading-8">
              Nome da notícia - headline da notícia
            </p>
            <p className="text-sm font-[400] leading-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </p>
          </div>
          <div className="flex items-center gap-1 text-center font-[600]">
            <div className="h-3.5 w-[13px]">
              <svg
                width="100%"
                height="100%"
                preserve-aspect-ratio="none"
                view-box="0 0 13 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 6.368 13.425 C 4.578 13.425 3.066 12.8 1.83 11.551 C 0.595 10.302 -0.015 8.782 0 6.992 H 1.567 C 1.58 8.339 2.046 9.487 2.967 10.436 C 3.888 11.384 5.021 11.858 6.367 11.858 C 7.723 11.858 8.878 11.379 9.834 10.42 C 10.789 9.46 11.267 8.297 11.267 6.928 C 11.267 5.593 10.787 4.464 9.827 3.542 C 8.868 2.619 7.714 2.158 6.367 2.158 C 5.7 2.158 5.07 2.294 4.475 2.567 C 3.881 2.839 3.356 3.208 2.9 3.675 H 4.3 V 4.892 H 0.484 V 1.108 H 1.667 V 2.692 C 2.278 2.036 2.986 1.519 3.792 1.142 C 4.598 0.764 5.456 0.575 6.367 0.575 C 7.256 0.575 8.092 0.744 8.875 1.083 C 9.659 1.422 10.346 1.881 10.938 2.458 C 11.529 3.036 11.993 3.711 12.329 4.483 C 12.666 5.256 12.834 6.086 12.834 6.975 C 12.834 7.864 12.666 8.7 12.329 9.483 C 11.993 10.266 11.529 10.95 10.938 11.533 C 10.346 12.117 9.659 12.578 8.875 12.917 C 8.092 13.256 7.256 13.425 6.368 13.425 Z M 8.434 9.825 L 5.867 7.292 V 3.625 H 7.05 V 6.775 L 9.3 8.958 L 8.434 9.825 Z"
                  fill="white"
                />
              </svg>
            </div>
            <p className="w-[63px] text-xs leading-4">Há 2 horas</p>
          </div>
        </div>
      </div>
    </div>
  )
}
