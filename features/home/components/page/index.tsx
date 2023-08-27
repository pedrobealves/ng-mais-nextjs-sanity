import Container from 'components/BlogContainer'
import Layout from 'components/BlogLayout'
import IndexPageHead from 'components/IndexPageHead'
import { Logo } from 'components/Logo'
import Footer from 'layouts/Footer'
import Header from 'layouts/Header'
import * as demo from 'lib/demo.data'
import type { Post, Settings } from 'lib/sanity.queries'
import { useState } from 'react'

import { Hero } from './Hero'
import { NewsSection } from './News'
import { PostSection } from './Post'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  posts: Post[]
  news: Post[]
  reviews: Post[]
  settings: Settings
}

export function HomePage(props: IndexPageProps) {
  const { preview, loading, news, reviews, posts, settings } = props
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
      <Header title={title} social={social} hero={<Hero />} level={1} />
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
            <NewsSection news={news} />
            <PostSection posts={posts} />
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
      <Footer />
    </>
  )
}
