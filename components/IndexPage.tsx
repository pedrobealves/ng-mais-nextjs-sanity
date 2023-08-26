import Container from 'components/BlogContainer'
import Layout from 'components/BlogLayout'
import IndexPageHead from 'components/IndexPageHead'
import { Logo } from 'components/Logo'
import HeroPost from 'features/post/components/HeroPost'
import MoreStories from 'features/post/components/MoreStories'
import Header from 'layouts/Header'
import * as demo from 'lib/demo.data'
import type { Post, Settings } from 'lib/sanity.queries'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  posts: Post[]
  settings: Settings
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, posts, settings } = props
  const [heroPost, ...morePosts] = posts || []
  const { title = demo.title, description = demo.description } = settings || {}

  return (
    <>
      <IndexPageHead settings={settings} />
      <header className="bg-gradient-header w-full px-4 rounded-b-[40px]">
        <nav className="container flex items-center justify-between mx-auto py-3">
          <Logo heightSymbol={106} heightLogo={64} isLight />

          <ul className="hidden lg:flex text-white font-semibold text-base gap-8">
            <li>
              <a
                href="#"
                className="block hover:text-secundary-4"
                aria-current="page"
              >
                Análises
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block hover:text-secundary-4"
                aria-current="page"
              >
                Notícias
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block hover:text-secundary-4"
                aria-current="page"
              >
                Matérias
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block hover:text-secundary-4"
                aria-current="page"
              >
                Weekly
              </a>
            </li>
          </ul>
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex gap-3">
              <a href="" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-white"
                  height="1rem"
                  viewBox="0 0 512 512"
                >
                  <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                </svg>
              </a>
              <a href="" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-white"
                  height="1rem"
                  viewBox="0 0 512 512"
                >
                  <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                </svg>
              </a>

              <a href="" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-white"
                  height="1rem"
                  viewBox="0 0 448 512"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </a>

              <a href="" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1rem"
                  className="fill-white"
                  viewBox="0 0 448 512"
                >
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                </svg>
              </a>
            </div>
            <button
              type="button"
              className="text-white bg-secundary-4 rounded-3xl p-4"
            >
              <img src="../assets/Search.svg" alt="Search" />
            </button>
          </div>
        </nav>
        <section className="container flex-col lg:flex-row mx-auto flex w-full pt-12 pb-32 gap-6">
          <div className="flex flex-col basis-1/2 gap-4 w-full">
            <div className="flex justify-start items-center gap-4">
              <div className="w-2 h-9 bg-white rounded-tr-[5px] rounded-br-[5px]"></div>
              <div className="text-center text-white text-2xl font-extrabold leading-loose">
                TenseiWeekly
              </div>
            </div>
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
                    <p className="text-4xl font-bold">Weekly 1</p>
                    <p className="text-lg leading-6">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col basis-1/2 gap-4 w-full">
            <div className="flex justify-start items-center gap-4">
              <div className="w-2 h-9 bg-white rounded-tr-[5px] rounded-br-[5px]"></div>
              <div className="text-center text-white text-2xl font-extrabold leading-loose">
                Reviews
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
                <div className="absolute bottom-0 py-3 px-4 flex flex-col items-start justify-between self-stretch">
                  <div className="flex flex-col items-start justify-end gap-2 self-stretch text-white">
                    <div className="flex flex-col items-start justify-end self-stretch text-left gap-1 max-w-sm">
                      <p className="text-xl font-bold">Outer Wilds</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full font-inter h-[22rem] flex-col items-start justify-end gap-2.5 overflow-clip rounded-r-3xl rounded-tl-3xl drop-shadow-lg">
                <img
                  className="absolute inset-0 h-full w-full object-cover"
                  src="https://cdn2.tfx.company/images/clickwallpapers-elden-ring-game-wallpaper-in-4k-img1.jpg"
                  alt="Flower and sky"
                />
                <div className="absolute inset-0 [background:rgba(87,_23,_149,_0.30)]"></div>
                <div className="absolute inset-0 [background:linear-gradient(180deg,_rgba(0,_0,_0,_0.00)_0%,_rgba(0,_0,_0,_0.90)_100%)]"></div>
                <div className="absolute bottom-0 py-3 px-4 flex flex-col items-start justify-between self-stretch">
                  <div className="flex flex-col items-start justify-end gap-2 self-stretch text-white">
                    <div className="flex flex-col items-start justify-end self-stretch text-left gap-1 max-w-sm">
                      <p className="text-xl font-bold">Outer Wilds</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full font-inter h-[22rem] flex-col items-start justify-end gap-2.5 overflow-clip rounded-r-3xl rounded-tl-3xl drop-shadow-lg">
                <img
                  className="absolute inset-0 h-full w-full object-cover"
                  src="https://cdn2.tfx.company/images/clickwallpapers-elden-ring-game-wallpaper-in-4k-img1.jpg"
                  alt="Flower and sky"
                />
                <div className="absolute inset-0 [background:rgba(87,_23,_149,_0.30)]"></div>
                <div className="absolute inset-0 [background:linear-gradient(180deg,_rgba(0,_0,_0,_0.00)_0%,_rgba(0,_0,_0,_0.90)_100%)]"></div>
                <div className="absolute bottom-0 py-3 px-4 flex flex-col items-start justify-between self-stretch">
                  <div className="flex flex-col items-start justify-end gap-2 self-stretch text-white">
                    <div className="flex flex-col items-start justify-end self-stretch text-left gap-1 max-w-sm">
                      <p className="text-xl font-bold">Outer Wilds</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>
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
                <div
                  className="group/open flex px-6 font-bold overflow-hidden text-primary-5 items-center cursor-pointer"
                  tabindex="1"
                >
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
                      className="peer hidden"
                      type="radio"
                      name="top"
                      checked
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
                      className="peer hidden"
                      type="radio"
                      name="top"
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
                      className="peer hidden"
                      type="radio"
                      name="top"
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
