import { Logo } from 'components/Logo'
import { Social } from 'components/Social'

export default function Footer() {
  return (
    <footer className="bg-gray-200 px-4">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between items-center py-20">
          <div className="max-w-[23rem] flex flex-col gap-9 justify-start sm:mb-6 mb-9 md:mb-0">
            <div className="flex flex-col gap-4">
              <Logo justify="justify-start" height={46} />
              <p className="text-primary-8 opacity-60">
                Seu ponto analítico e informativo do mundo dos games.
              </p>
            </div>
            <div className="flex gap-4 sm:mt-0">
              <Social
                color="text-primary-8"
                hoverColor="hover:text-secundary-5"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-[23rem] w-full">
            <div>
              <h2 className="text-base mb-4 font-bold text-primary-8 uppercase opacity-60">
                Sobre
              </h2>
              <ul className="flex flex-col gap-4 text-primary-8 font-bold">
                <li>
                  <a href="#" className="hover:underline">
                    Sobre Nós
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-base font-bold text-primary-8 uppercase opacity-60">
                Política
              </h2>
              <ul className="flex flex-col gap-4 text-primary-8 font-bold">
                <li>
                  <a href="" className="hover:underline">
                    Utilização
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="h-[2px] bg-gray-300 sm:mx-auto" />
        <div className="pt-8 pb-11 flex items-center justify-center">
          <span className="text-sm text-primary-8 text-center opacity-60">
            &copy; {new Date().getFullYear()}
            <a href="https://newgamemais.com" className="hover:underline pl-1">
              ng+
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
