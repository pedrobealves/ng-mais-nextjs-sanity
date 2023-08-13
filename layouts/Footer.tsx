export default function Footer() {
  return (
    <footer className="bg-gradient-footer px-4">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between items-center py-20">
          <div className="max-w-[23rem] flex flex-col gap-9 justify-start sm:mb-6 mb-9 md:mb-0">
            <div className="flex flex-col gap-4">
              <a href="#" className="flex items-center gap-3.5">
                <img src="../assets/g1239.svg" alt="Logo" />
                <img src="../assets/g1204.svg" alt="Logo" />
              </a>
              <p className="text-white opacity-60">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </p>
            </div>
            <div className="flex gap-4 sm:mt-0">Links Social</div>
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-[23rem] w-full">
            <div>
              <h2 className="text-base mb-4 font-bold text-white uppercase opacity-60">
                Resources
              </h2>
              <ul className="flex flex-col gap-4 text-white font-bold">
                <li>
                  <a href="https://flowbite.com" className="hover:underline">
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/4eeurUVvTy"
                    className="hover:underline"
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-base font-bold text-white uppercase opacity-60">
                Follow us
              </h2>
              <ul className="flex flex-col gap-4 text-white font-bold">
                <li>
                  <a
                    href="https://github.com/themesberg/flowbite"
                    className="hover:underline"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/4eeurUVvTy"
                    className="hover:underline"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/4eeurUVvTy"
                    className="hover:underline"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="h-[2px] text-white opacity-10 sm:mx-auto" />
        <div className="pt-8 pb-11 flex items-center justify-center">
          <span className="text-sm text-white text-center opacity-60">
            © 2023
            <a href="https://miltensei.com" className="hover:underline">
              Miltensei
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
