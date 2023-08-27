import Container from 'components/BlogContainer'
import Layout from 'components/BlogLayout'
import IndexPageHead from 'components/IndexPageHead'
import { Logo } from 'components/Logo'
import Header from 'layouts/Header'
import * as demo from 'lib/demo.data'
import type { Post, Settings } from 'lib/sanity.queries'
import { useState } from 'react'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  posts: Post[]
  news: Post[]
  reviews: Post[]
  settings: Settings
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, posts, settings } = props
  const [heroPost, ...morePosts] = posts || []
  const { title = demo.title, social } = settings || {}

  // State for storing the selected option. Default is "Male"
  const [selectedOption, setSelectedOption] = useState('game1')

  // Function to handle the change in radio button selection
  function onValueChange(event) {
    // Updating the state with the selected radio button's value
    setSelectedOption(event.target.value)
  }

  return (
    <>
      <IndexPageHead settings={settings} />
      <Header title={title} social={social} level={1} />
      <main className="w-full mx-auto justify-center -m-10 gap-10 px-4">
        <section className="container mx-auto pb-10">
          <form
            action=""
            className="focus-within:ring-2 focus-within:ring-secundary-4 w-full flex justify-between rounded-full shadow-xl bg-white border max-w-col-6"
          >
            <input
              type="email"
              className="sm:flex-1 w-full outline-none rounded-full pl-8 pr-4 text-lg font-medium"
              placeholder=" Digite seu e-mail"
            />
            <button className="bg-secundary-4 text-white font-bold sm:px-9 px-5 py-5 rounded-full hover:bg-secundary-5 m-2">
              <p className="sm:block hidden">Inscreva-se</p>
              <p className="sm:hidden block">Ic</p>
            </button>
          </form>
        </section>
        <section className="container flex justify-center lg:flex-nowrap flex-wrap mx-auto gap-6 pb-60">
          <section className="flex flex-col w-full max-w-col-9 gap-10">
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
                <button className="px-4 py-3 rounded-full bg-white font-bold text-primary-5 drop-shadow-lg hover:drop-shadow-none hover:bg-gray-200">
                  Categoria 1
                </button>
                <button className="px-4 py-3 rounded-full bg-white font-bold text-primary-5 drop-shadow-lg hover:drop-shadow-none hover:bg-gray-200">
                  Categoria 2
                </button>
                <button className="px-4 py-3 rounded-full bg-white font-bold text-primary-5 drop-shadow-lg hover:drop-shadow-none hover:bg-gray-200">
                  Categoria 3
                </button>
              </div>
              <div className="flex flex-col lg:grid-cols-3 sm:grid sm:grid-cols-2 gap-6">
                <div className="bg-white transition duration-30 drop-shadow-xl hover:drop-shadow-2xl overflow-hidden rounded-xl h-[19.25rem] group">
                  <img
                    alt="Placeholder"
                    className="h-[8.75rem] w-full"
                    src="https://images4.alphacoders.com/106/1064722.jpg"
                  />
                  <div className="flex flex-col gap-3 rounded-xl z-50 bg-white relative px-6 pt-5 pb-6 -mt-3">
                    <div className="flex justify-between items-center">
                      <button className="bg-white rounded-full text-xs font-extrabold px-2 py-1 drop-shadow-lg uppercase text-primary-5">
                        Categoria
                      </button>
                      <div className="flex items-center gap-1 text-neutral-900 text-center font-semibold opacity-40">
                        <div className="h-3.5 w-[13px]">
                          <svg
                            width="100%"
                            height="100%"
                            preserve-aspect-ratio="none"
                            view-box="0 0 13 14"
                            fill="text-neutral-900"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M 6.368 13.425 C 4.578 13.425 3.066 12.8 1.83 11.551 C 0.595 10.302 -0.015 8.782 0 6.992 H 1.567 C 1.58 8.339 2.046 9.487 2.967 10.436 C 3.888 11.384 5.021 11.858 6.367 11.858 C 7.723 11.858 8.878 11.379 9.834 10.42 C 10.789 9.46 11.267 8.297 11.267 6.928 C 11.267 5.593 10.787 4.464 9.827 3.542 C 8.868 2.619 7.714 2.158 6.367 2.158 C 5.7 2.158 5.07 2.294 4.475 2.567 C 3.881 2.839 3.356 3.208 2.9 3.675 H 4.3 V 4.892 H 0.484 V 1.108 H 1.667 V 2.692 C 2.278 2.036 2.986 1.519 3.792 1.142 C 4.598 0.764 5.456 0.575 6.367 0.575 C 7.256 0.575 8.092 0.744 8.875 1.083 C 9.659 1.422 10.346 1.881 10.938 2.458 C 11.529 3.036 11.993 3.711 12.329 4.483 C 12.666 5.256 12.834 6.086 12.834 6.975 C 12.834 7.864 12.666 8.7 12.329 9.483 C 11.993 10.266 11.529 10.95 10.938 11.533 C 10.346 12.117 9.659 12.578 8.875 12.917 C 8.092 13.256 7.256 13.425 6.368 13.425 Z M 8.434 9.825 L 5.867 7.292 V 3.625 H 7.05 V 6.775 L 9.3 8.958 L 8.434 9.825 Z"
                              fill="text-neutral-900"
                            />
                          </svg>
                        </div>
                        <p className="text-xs leading-4">Há 2 horas</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl text-primary-8 font-bold">
                        Nome da noticia - headline da noticia
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="underline font-bold text-primary-8 opacity-40 group-hover:opacity-100 transition duration-500 ease-out">
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
                  </div>
                </div>
                <div className="bg-white transition duration-30 drop-shadow-xl hover:drop-shadow-2xl overflow-hidden rounded-xl h-[19.25rem] group">
                  <img
                    alt="Placeholder"
                    className="h-[8.75rem] w-full"
                    src="https://images4.alphacoders.com/106/1064722.jpg"
                  />
                  <div className="flex flex-col gap-3 rounded-xl z-50 bg-white relative px-6 pt-5 pb-6 -mt-3">
                    <div className="flex justify-between items-center">
                      <button className="bg-white rounded-full text-xs font-extrabold px-2 py-1 drop-shadow-lg uppercase text-primary-5">
                        Categoria
                      </button>
                      <div className="flex items-center gap-1 text-neutral-900 text-center font-semibold opacity-40">
                        <div className="h-3.5 w-[13px]">
                          <svg
                            width="100%"
                            height="100%"
                            preserve-aspect-ratio="none"
                            view-box="0 0 13 14"
                            fill="text-neutral-900"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M 6.368 13.425 C 4.578 13.425 3.066 12.8 1.83 11.551 C 0.595 10.302 -0.015 8.782 0 6.992 H 1.567 C 1.58 8.339 2.046 9.487 2.967 10.436 C 3.888 11.384 5.021 11.858 6.367 11.858 C 7.723 11.858 8.878 11.379 9.834 10.42 C 10.789 9.46 11.267 8.297 11.267 6.928 C 11.267 5.593 10.787 4.464 9.827 3.542 C 8.868 2.619 7.714 2.158 6.367 2.158 C 5.7 2.158 5.07 2.294 4.475 2.567 C 3.881 2.839 3.356 3.208 2.9 3.675 H 4.3 V 4.892 H 0.484 V 1.108 H 1.667 V 2.692 C 2.278 2.036 2.986 1.519 3.792 1.142 C 4.598 0.764 5.456 0.575 6.367 0.575 C 7.256 0.575 8.092 0.744 8.875 1.083 C 9.659 1.422 10.346 1.881 10.938 2.458 C 11.529 3.036 11.993 3.711 12.329 4.483 C 12.666 5.256 12.834 6.086 12.834 6.975 C 12.834 7.864 12.666 8.7 12.329 9.483 C 11.993 10.266 11.529 10.95 10.938 11.533 C 10.346 12.117 9.659 12.578 8.875 12.917 C 8.092 13.256 7.256 13.425 6.368 13.425 Z M 8.434 9.825 L 5.867 7.292 V 3.625 H 7.05 V 6.775 L 9.3 8.958 L 8.434 9.825 Z"
                              fill="text-neutral-900"
                            />
                          </svg>
                        </div>
                        <p className="text-xs leading-4">Há 2 horas</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl text-primary-8 font-bold">
                        Nome da noticia - headline da noticia
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="underline font-bold text-primary-8 opacity-40 group-hover:opacity-100 transition duration-500 ease-out">
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
                  </div>
                </div>
                <div className="bg-white transition duration-30 drop-shadow-xl hover:drop-shadow-2xl overflow-hidden rounded-xl h-[19.25rem] group">
                  <img
                    alt="Placeholder"
                    className="h-[8.75rem] w-full"
                    src="https://images4.alphacoders.com/106/1064722.jpg"
                  />
                  <div className="flex flex-col gap-3 rounded-xl z-50 bg-white relative px-6 pt-5 pb-6 -mt-3">
                    <div className="flex justify-between items-center">
                      <button className="bg-white rounded-full text-xs font-extrabold px-2 py-1 drop-shadow-lg uppercase text-primary-5">
                        Categoria
                      </button>
                      <div className="flex items-center gap-1 text-neutral-900 text-center font-semibold opacity-40">
                        <div className="h-3.5 w-[13px]">
                          <svg
                            width="100%"
                            height="100%"
                            preserve-aspect-ratio="none"
                            view-box="0 0 13 14"
                            fill="text-neutral-900"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M 6.368 13.425 C 4.578 13.425 3.066 12.8 1.83 11.551 C 0.595 10.302 -0.015 8.782 0 6.992 H 1.567 C 1.58 8.339 2.046 9.487 2.967 10.436 C 3.888 11.384 5.021 11.858 6.367 11.858 C 7.723 11.858 8.878 11.379 9.834 10.42 C 10.789 9.46 11.267 8.297 11.267 6.928 C 11.267 5.593 10.787 4.464 9.827 3.542 C 8.868 2.619 7.714 2.158 6.367 2.158 C 5.7 2.158 5.07 2.294 4.475 2.567 C 3.881 2.839 3.356 3.208 2.9 3.675 H 4.3 V 4.892 H 0.484 V 1.108 H 1.667 V 2.692 C 2.278 2.036 2.986 1.519 3.792 1.142 C 4.598 0.764 5.456 0.575 6.367 0.575 C 7.256 0.575 8.092 0.744 8.875 1.083 C 9.659 1.422 10.346 1.881 10.938 2.458 C 11.529 3.036 11.993 3.711 12.329 4.483 C 12.666 5.256 12.834 6.086 12.834 6.975 C 12.834 7.864 12.666 8.7 12.329 9.483 C 11.993 10.266 11.529 10.95 10.938 11.533 C 10.346 12.117 9.659 12.578 8.875 12.917 C 8.092 13.256 7.256 13.425 6.368 13.425 Z M 8.434 9.825 L 5.867 7.292 V 3.625 H 7.05 V 6.775 L 9.3 8.958 L 8.434 9.825 Z"
                              fill="text-neutral-900"
                            />
                          </svg>
                        </div>
                        <p className="text-xs leading-4">Há 2 horas</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl text-primary-8 font-bold">
                        Nome da noticia - headline da noticia
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="underline font-bold text-primary-8 opacity-40 group-hover:opacity-100 transition duration-500 ease-out">
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
                  </div>
                </div>
                <div className="bg-white transition duration-30 drop-shadow-xl hover:drop-shadow-2xl overflow-hidden rounded-xl h-[19.25rem] group">
                  <img
                    alt="Placeholder"
                    className="h-[8.75rem] w-full"
                    src="https://images4.alphacoders.com/106/1064722.jpg"
                  />
                  <div className="flex flex-col gap-3 rounded-xl z-50 bg-white relative px-6 pt-5 pb-6 -mt-3">
                    <div className="flex justify-between items-center">
                      <button className="bg-white rounded-full text-xs font-extrabold px-2 py-1 drop-shadow-lg uppercase text-primary-5">
                        Categoria
                      </button>
                      <div className="flex items-center gap-1 text-neutral-900 text-center font-semibold opacity-40">
                        <div className="h-3.5 w-[13px]">
                          <svg
                            width="100%"
                            height="100%"
                            preserve-aspect-ratio="none"
                            view-box="0 0 13 14"
                            fill="text-neutral-900"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M 6.368 13.425 C 4.578 13.425 3.066 12.8 1.83 11.551 C 0.595 10.302 -0.015 8.782 0 6.992 H 1.567 C 1.58 8.339 2.046 9.487 2.967 10.436 C 3.888 11.384 5.021 11.858 6.367 11.858 C 7.723 11.858 8.878 11.379 9.834 10.42 C 10.789 9.46 11.267 8.297 11.267 6.928 C 11.267 5.593 10.787 4.464 9.827 3.542 C 8.868 2.619 7.714 2.158 6.367 2.158 C 5.7 2.158 5.07 2.294 4.475 2.567 C 3.881 2.839 3.356 3.208 2.9 3.675 H 4.3 V 4.892 H 0.484 V 1.108 H 1.667 V 2.692 C 2.278 2.036 2.986 1.519 3.792 1.142 C 4.598 0.764 5.456 0.575 6.367 0.575 C 7.256 0.575 8.092 0.744 8.875 1.083 C 9.659 1.422 10.346 1.881 10.938 2.458 C 11.529 3.036 11.993 3.711 12.329 4.483 C 12.666 5.256 12.834 6.086 12.834 6.975 C 12.834 7.864 12.666 8.7 12.329 9.483 C 11.993 10.266 11.529 10.95 10.938 11.533 C 10.346 12.117 9.659 12.578 8.875 12.917 C 8.092 13.256 7.256 13.425 6.368 13.425 Z M 8.434 9.825 L 5.867 7.292 V 3.625 H 7.05 V 6.775 L 9.3 8.958 L 8.434 9.825 Z"
                              fill="text-neutral-900"
                            />
                          </svg>
                        </div>
                        <p className="text-xs leading-4">Há 2 horas</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl text-primary-8 font-bold">
                        Nome da noticia - headline da noticia
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="underline font-bold text-primary-8 opacity-40 group-hover:opacity-100 transition duration-500 ease-out">
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
                  </div>
                </div>
                <div className="bg-white transition duration-30 drop-shadow-xl hover:drop-shadow-2xl overflow-hidden rounded-xl h-[19.25rem] group">
                  <img
                    alt="Placeholder"
                    className="h-[8.75rem] w-full"
                    src="https://images4.alphacoders.com/106/1064722.jpg"
                  />
                  <div className="flex flex-col gap-3 rounded-xl z-50 bg-white relative px-6 pt-5 pb-6 -mt-3">
                    <div className="flex justify-between items-center">
                      <button className="bg-white rounded-full text-xs font-extrabold px-2 py-1 drop-shadow-lg uppercase text-primary-5">
                        Categoria
                      </button>
                      <div className="flex items-center gap-1 text-neutral-900 text-center font-semibold opacity-40">
                        <div className="h-3.5 w-[13px]">
                          <svg
                            width="100%"
                            height="100%"
                            preserve-aspect-ratio="none"
                            view-box="0 0 13 14"
                            fill="text-neutral-900"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M 6.368 13.425 C 4.578 13.425 3.066 12.8 1.83 11.551 C 0.595 10.302 -0.015 8.782 0 6.992 H 1.567 C 1.58 8.339 2.046 9.487 2.967 10.436 C 3.888 11.384 5.021 11.858 6.367 11.858 C 7.723 11.858 8.878 11.379 9.834 10.42 C 10.789 9.46 11.267 8.297 11.267 6.928 C 11.267 5.593 10.787 4.464 9.827 3.542 C 8.868 2.619 7.714 2.158 6.367 2.158 C 5.7 2.158 5.07 2.294 4.475 2.567 C 3.881 2.839 3.356 3.208 2.9 3.675 H 4.3 V 4.892 H 0.484 V 1.108 H 1.667 V 2.692 C 2.278 2.036 2.986 1.519 3.792 1.142 C 4.598 0.764 5.456 0.575 6.367 0.575 C 7.256 0.575 8.092 0.744 8.875 1.083 C 9.659 1.422 10.346 1.881 10.938 2.458 C 11.529 3.036 11.993 3.711 12.329 4.483 C 12.666 5.256 12.834 6.086 12.834 6.975 C 12.834 7.864 12.666 8.7 12.329 9.483 C 11.993 10.266 11.529 10.95 10.938 11.533 C 10.346 12.117 9.659 12.578 8.875 12.917 C 8.092 13.256 7.256 13.425 6.368 13.425 Z M 8.434 9.825 L 5.867 7.292 V 3.625 H 7.05 V 6.775 L 9.3 8.958 L 8.434 9.825 Z"
                              fill="text-neutral-900"
                            />
                          </svg>
                        </div>
                        <p className="text-xs leading-4">Há 2 horas</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl text-primary-8 font-bold">
                        Nome da noticia - headline da noticia
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="underline font-bold text-primary-8 opacity-40 group-hover:opacity-100 transition duration-500 ease-out">
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
                  </div>
                </div>
                <div className="bg-white transition duration-30 drop-shadow-xl hover:drop-shadow-2xl overflow-hidden rounded-xl h-[19.25rem] group">
                  <img
                    alt="Placeholder"
                    className="h-[8.75rem] w-full"
                    src="https://images4.alphacoders.com/106/1064722.jpg"
                  />
                  <div className="flex flex-col gap-3 rounded-xl z-50 bg-white relative px-6 pt-5 pb-6 -mt-3">
                    <div className="flex justify-between items-center">
                      <button className="bg-white rounded-full text-xs font-extrabold px-2 py-1 drop-shadow-lg uppercase text-primary-5">
                        Categoria
                      </button>
                      <div className="flex items-center gap-1 text-neutral-900 text-center font-semibold opacity-40">
                        <div className="h-3.5 w-[13px]">
                          <svg
                            width="100%"
                            height="100%"
                            preserve-aspect-ratio="none"
                            view-box="0 0 13 14"
                            fill="text-neutral-900"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M 6.368 13.425 C 4.578 13.425 3.066 12.8 1.83 11.551 C 0.595 10.302 -0.015 8.782 0 6.992 H 1.567 C 1.58 8.339 2.046 9.487 2.967 10.436 C 3.888 11.384 5.021 11.858 6.367 11.858 C 7.723 11.858 8.878 11.379 9.834 10.42 C 10.789 9.46 11.267 8.297 11.267 6.928 C 11.267 5.593 10.787 4.464 9.827 3.542 C 8.868 2.619 7.714 2.158 6.367 2.158 C 5.7 2.158 5.07 2.294 4.475 2.567 C 3.881 2.839 3.356 3.208 2.9 3.675 H 4.3 V 4.892 H 0.484 V 1.108 H 1.667 V 2.692 C 2.278 2.036 2.986 1.519 3.792 1.142 C 4.598 0.764 5.456 0.575 6.367 0.575 C 7.256 0.575 8.092 0.744 8.875 1.083 C 9.659 1.422 10.346 1.881 10.938 2.458 C 11.529 3.036 11.993 3.711 12.329 4.483 C 12.666 5.256 12.834 6.086 12.834 6.975 C 12.834 7.864 12.666 8.7 12.329 9.483 C 11.993 10.266 11.529 10.95 10.938 11.533 C 10.346 12.117 9.659 12.578 8.875 12.917 C 8.092 13.256 7.256 13.425 6.368 13.425 Z M 8.434 9.825 L 5.867 7.292 V 3.625 H 7.05 V 6.775 L 9.3 8.958 L 8.434 9.825 Z"
                              fill="text-neutral-900"
                            />
                          </svg>
                        </div>
                        <p className="text-xs leading-4">Há 2 horas</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl text-primary-8 font-bold">
                        Nome da noticia - headline da noticia
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="underline font-bold text-primary-8 opacity-40 group-hover:opacity-100 transition duration-500 ease-out">
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
                  </div>
                </div>
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
            <section className="flex flex-col gap-10">
              <div className="flex justify-start items-center gap-4">
                <div className="w-2 h-9 bg-primary-5 rounded-tr-[5px] rounded-br-[5px]"></div>
                <div className="text-center text-primary-5 text-2xl font-extrabold leading-loose">
                  Matérias
                </div>
              </div>
              <div className="grid w-full md:grid-cols-3 [&>*:first-child]:sm:col-span-2 sm:grid-cols-2 grid-cols-1 [&>*:first-child]:md:row-span-2 gap-6">
                <div className="w-full md:h-72 font-inter flex-col items-start justify-end gap-2.5 overflow-clip rounded-3xl drop-shadow-xl">
                  <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://image.api.playstation.com/vulcan/ap/rnd/202105/1417/HM9fBpwxGcon3lbajBIpHcWk.png"
                    alt="Flower and sky"
                  />
                  <div className="absolute inset-0 [background-image:linear-gradient(180deg,_rgba(90,_24,_154,_0.00)_0%,_rgba(90,_24,_154,_0.90)_82.96%)]"></div>
                  <div className="md:absolute relative bottom-0 p-3 flex md:flex-row gap-3 items-end w-full">
                    <img
                      src="https://cdn.mobygames.com/covers/10181811-age-of-empires-iv-windows-apps-front-cover.jpg"
                      className="h-40 rounded-xl border-4 border-white"
                    />
                    <div className="flex flex-col bg-white rounded-r-xl rounded-bl-xl p-4 w-full">
                      <h3 className="text-2xl text-primary-5 font-bold">
                        Nome da matéria - headline da matéria
                      </h3>
                      <p className="text-primary-5 hidden md:block">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full h-auto font-inter flex-col items-start justify-end gap-2.5 overflow-clip rounded-[20px] drop-shadow-xl">
                  <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://image.api.playstation.com/vulcan/ap/rnd/202105/1417/HM9fBpwxGcon3lbajBIpHcWk.png"
                    alt="Flower and sky"
                  />
                  <div className="absolute inset-0 [background-image:linear-gradient(180deg,_rgba(90,_24,_154,_0.00)_0%,_rgba(90,_24,_154,_0.90)_82.96%)]"></div>
                  <div className="md:absolute relative bottom-0 p-2 flex md:flex-row gap-3 items-end w-full">
                    <img
                      src="https://cdn.mobygames.com/covers/10181811-age-of-empires-iv-windows-apps-front-cover.jpg"
                      className="h-24 rounded-xl border-2 border-white"
                    />
                    <div className="flex flex-col bg-white rounded-r-xl rounded-bl-xl p-2 w-full">
                      <h3 className="text-base text-primary-5 font-bold">
                        Nome da matéria - headline da matéria
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="w-full h-auto font-inter flex-col items-start justify-end gap-2.5 overflow-clip rounded-[20px] drop-shadow-xl">
                  <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://image.api.playstation.com/vulcan/ap/rnd/202105/1417/HM9fBpwxGcon3lbajBIpHcWk.png"
                    alt="Flower and sky"
                  />
                  <div className="absolute inset-0 [background-image:linear-gradient(180deg,_rgba(90,_24,_154,_0.00)_0%,_rgba(90,_24,_154,_0.90)_82.96%)]"></div>
                  <div className="md:absolute relative bottom-0 p-2 flex md:flex-row gap-3 items-end w-full">
                    <img
                      src="https://cdn.mobygames.com/covers/10181811-age-of-empires-iv-windows-apps-front-cover.jpg"
                      className="h-24 rounded-xl border-2 border-white"
                    />
                    <div className="flex flex-col bg-white rounded-r-xl rounded-bl-xl p-2 w-full">
                      <h3 className="text-base text-primary-5 font-bold">
                        Nome da matéria - headline da matéria
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
          <aside className="flex lg:flex-col flex-row sm:flex-nowrap flex-wrap lg:max-w-col-3 w-full border-l-2 border-l-gray-100 gap-10">
            <section className="flex flex-col gap-6 w-full">
              <div className="flex justify-start items-center gap-4">
                <div className="w-2 h-9 bg-primary-5 rounded-tr-[5px] rounded-br-[5px]"></div>
                <div className="text-center text-primary-5 text-2xl font-extrabold leading-loose">
                  Top Jogos
                </div>
              </div>
              <div className="pl-6">
                <ul className="flex flex-col">
                  <li className="flex flex-col gap-3">
                    <input
                      id="game1"
                      value="game1"
                      className="peer hidden"
                      type="radio"
                      name="top"
                      checked={selectedOption === 'game1'}
                      onChange={onValueChange}
                    />
                    <label
                      htmlFor="game1"
                      className="flex gap-3 cursor-pointer peer-checked:[&>*:first-child]:text-2xl peer-checked:[&>*:first-child]:font-bold peer-checked:[&>*:first-child]:text-primary-5 peer-checked:[&_small]:block peer-checked:[&_p]:font-bold peer-checked:[&_p]:text-primary-5"
                    >
                      <span className="text-base font-normal text-primary-8">
                        1
                      </span>
                      <div className="flex flex-col">
                        <p className="text-base font-normal text-primary-8">
                          Sonic Generations 7
                        </p>
                        <small className="hidden font-normal text-xs text-neutral-600">
                          Aventura
                        </small>
                      </div>
                    </label>
                    <div className="peer-checked:h-40 h-0 transform overflow-hidden transition-all duration-500 ease-in">
                      <div className="flex gap-5 transition-all duration-500 ease-in-out hover:bg-neutral-200 hover:rounded-xl cursor-pointer">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/pt/2/2f/Sonic_Generations_capa.png"
                          className="w-24 h-[8.5rem] rounded-xl border-primary-5 border-2"
                        />
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-center text-lg font-extrabold text-white h-12 w-12 bg-primary-5 rounded-full">
                            100
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="flex flex-col font-normal text-xs text-neutral-600">
                              <span>Lançamento</span>
                              <span>01/02/2030</span>
                            </div>
                            <div className="flex flex-col font-normal text-xs text-neutral-600">
                              <span>Desenvolvedor</span>
                              <span>Sega</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="flex flex-col gap-3">
                    <input
                      id="game2"
                      value="game2"
                      className="peer hidden"
                      type="radio"
                      name="top"
                      checked={selectedOption === 'game2'}
                      onChange={onValueChange}
                    />
                    <label
                      htmlFor="game2"
                      className="flex gap-3 cursor-pointer peer-checked:[&>*:first-child]:text-2xl peer-checked:[&>*:first-child]:font-bold peer-checked:[&>*:first-child]:text-primary-5 peer-checked:[&_small]:block peer-checked:[&_p]:font-bold peer-checked:[&_p]:text-primary-5"
                    >
                      <span className="text-base font-normal text-primary-8">
                        1
                      </span>
                      <div className="flex flex-col">
                        <p className="text-base font-normal text-primary-8">
                          Sonic Generations 7
                        </p>
                        <small className="hidden font-normal text-xs text-neutral-600">
                          Aventura
                        </small>
                      </div>
                    </label>
                    <div className="peer-checked:h-36 h-0 transform overflow-hidden transition-all duration-500 ease-in-out">
                      <div className="flex gap-5">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/pt/2/2f/Sonic_Generations_capa.png"
                          className="w-24 h-[8.5rem] rounded-xl border-primary-5 border-2"
                        />
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-center text-lg font-extrabold text-white h-12 w-12 bg-primary-5 rounded-full">
                            100
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="flex flex-col font-normal text-xs text-neutral-600">
                              <span>Lançamento</span>
                              <span>01/02/2030</span>
                            </div>
                            <div className="flex flex-col font-normal text-xs text-neutral-600">
                              <span>Desenvolvedor</span>
                              <span>Sega</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="flex flex-col gap-3">
                    <input
                      id="game3"
                      value="game3"
                      className="peer hidden"
                      type="radio"
                      name="top"
                      checked={selectedOption === 'game3'}
                      onChange={onValueChange}
                    />
                    <label
                      htmlFor="game3"
                      className="flex gap-3 cursor-pointer peer-checked:[&>*:first-child]:text-2xl peer-checked:[&>*:first-child]:font-bold peer-checked:[&>*:first-child]:text-primary-5 peer-checked:[&_small]:block peer-checked:[&_p]:font-bold peer-checked:[&_p]:text-primary-5"
                    >
                      <span className="text-base font-normal text-primary-8">
                        1
                      </span>
                      <div className="flex flex-col">
                        <p className="text-base font-normal text-primary-8">
                          Sonic Generations 7
                        </p>
                        <small className="hidden font-normal text-xs text-neutral-600">
                          Aventura
                        </small>
                      </div>
                    </label>
                    <div className="peer-checked:h-36 h-0 transform overflow-hidden transition-all duration-500 ease-in-out">
                      <div className="flex gap-5">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/pt/2/2f/Sonic_Generations_capa.png"
                          className="w-24 h-[8.5rem] rounded-xl border-primary-5 border-2"
                        />
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-center text-lg font-extrabold text-white h-12 w-12 bg-primary-5 rounded-full">
                            100
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="flex flex-col font-normal text-xs text-neutral-600">
                              <span>Lançamento</span>
                              <span>01/02/2030</span>
                            </div>
                            <div className="flex flex-col font-normal text-xs text-neutral-600">
                              <span>Desenvolvedor</span>
                              <span>Sega</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
            <section className="flex flex-col gap-6 w-full">
              <div className="flex justify-start items-center gap-4">
                <div className="w-2 h-9 bg-primary-5 rounded-tr-[5px] rounded-br-[5px]"></div>
                <div className="text-center text-primary-5 text-2xl font-extrabold leading-loose">
                  Artigos MIL
                </div>
              </div>
              <ul>
                <li className="flex flex-row bg-gray-100 p-2 rounded-r-[20px]">
                  <div className="flex flex-col gap-2 px-3 justify-center w-full">
                    <hr className="w-5 h-[2px] border-0 bg-primary-8" />
                    <h1 className="text-primary-8 font-bold text-base">
                      Nome do artigo - headline do artigo
                    </h1>
                  </div>
                  <img
                    src="https://image.api.playstation.com/vulcan/img/cfn/113073qYZHyiDU5-4vu9krqfIPdGCvcGob0VpazrmfyUEbn4qZ64XBJfRKHvwa_tStB4nMD3UDv4Cb9V3iTH6cJymhQ1sJiU.png"
                    className="min-h-[10rem] w-24 max-h-full object-cover rounded-2xl"
                  />
                </li>
              </ul>
            </section>
          </aside>
        </section>
      </main>
    </>
  )
}
