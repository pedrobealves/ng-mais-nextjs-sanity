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
      <section className="container mx-auto w-full -m-10 px-4">
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
      <div className="w-full h-72"></div>
    </>
  )
}
