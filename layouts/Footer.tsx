import { Icon } from 'components/Icon'
import Link from 'components/Link'
import { Logo } from 'components/Logo'
import { socialIconMap } from 'components/SocialIcon'
import type { Settings } from 'lib/sanity.queries'

type FooterProps = {
  settings: Settings
}

export default function Footer({ settings }: FooterProps) {
  return (
    <footer className="bg-gray-200 px-4">
      <div className="mx-auto px-4 max-w-screen-xl">
        <div className="md:flex md:justify-between items-center py-20">
          <div className="max-w-[23rem] flex flex-col gap-9 justify-start sm:mb-6 mb-9 md:mb-0">
            <div className="flex flex-col gap-4">
              <Logo justify="justify-start" height={46} />
              <p className="text-primary-8 opacity-60">
                Seu ponto analítico e informativo do mundo dos games.
              </p>
            </div>
            <div className="flex sm:justify-normal justify-around gap-3 sm:mt-0">
              {settings?.social?.map((item) => (
                <Link
                  key={item._key}
                  href={item.url}
                  aria-label={`Ir ao ${item.media} do website`}
                >
                  <Icon
                    icon={socialIconMap(item.media)}
                    color="text-primary-8"
                    hoverColor="hover:text-secundary-5"
                    className="hidden sm:block"
                    size={16}
                  />
                  <Icon
                    icon={socialIconMap(item.media)}
                    color="text-primary-8"
                    hoverColor="hover:text-secundary-5"
                    className="block sm:hidden"
                    size={24}
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-[23rem] w-full">
            <div>
              <h2 className="text-base mb-4 font-bold text-primary-8 uppercase opacity-60">
                Sobre
              </h2>
              <ul className="flex flex-col gap-4 text-primary-8 font-bold">
                <li>
                  <Link href="/author" className="hover:underline">
                    Sobre Nós
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-base font-bold text-primary-8 uppercase opacity-60">
                Política
              </h2>
              <ul className="flex flex-col gap-4 text-primary-8 font-bold">
                <li>
                  <Link href="/privacy-policy" className="hover:underline">
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-use" className="hover:underline">
                    Termos
                  </Link>
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
