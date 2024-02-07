import Link from 'components/Link'
import Image from 'next/image'
import BackgroundImage from 'public/404.png'
import { FaChevronLeft } from 'react-icons/fa6'

export function NotFound() {
  return (
    <main className="relative w-full h-screen">
      <Image
        src={BackgroundImage.src}
        alt="404"
        fill={true}
        className="absolute pt-20 object-cover"
      />
      <div className="absolute bottom-0 w-full content-start z-50 pb-9">
        <div className="flex w-full justify-center">
          <Link
            className="flex justify-center w-fit text-primary-8 bg-white p-3 rounded-full"
            href={'/'}
          >
            <FaChevronLeft size={48} />
          </Link>
        </div>
      </div>
    </main>
  )
}
