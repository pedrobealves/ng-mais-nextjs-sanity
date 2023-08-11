import { urlForImage } from 'lib/sanity.image'
import type { Author } from 'lib/sanity.queries'
import Image from 'next/image'
import Link from 'next/link'
import { IconContext } from 'react-icons'
import { FaTwitter } from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'

export default function PostAuthorBio(props: Author) {
  const { name, picture, bio, twitter, facebook } = props

  return (
    <div className="w-full flex font-body flex-col items-start gap-6 text-primary-8 border-t-2 border-gray-300 py-6">
      <div className="flex w-full items-center gap-3 self-stretch">
        <div className="flex h-full items-start self-stretch py-1">
          <Image
            src={
              picture?.asset?._ref
                ? urlForImage(picture).height(70).width(70).fit('crop').url()
                : 'https://source.unsplash.com/96x96/?face'
            }
            className="rounded-full bg-cover bg-center"
            height={70}
            width={70}
            alt={picture.alt ?? name}
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-6 [flex-grow:1]">
          <div className="flex w-full flex-col items-start justify-center gap-1 self-stretch">
            <p className="text-center text-lg md:text-1xl font-bold leading-7.3 md:leading-9">
              {name}
            </p>
            <p className="text-left text-lg md:text-1xl font-normal leading-7 md:leading-7.5">
              {bio}
            </p>
          </div>
          <div className="flex items-center gap-5">
            <IconContext.Provider value={{ size: '24' }}>
              <Link href={twitter} target="_blank" passHref>
                <FaTwitter className="hover:text-primary-5" />
              </Link>
              <Link href={facebook} target="_blank" passHref>
                <FaFacebook className="hover:text-primary-5" />
              </Link>
            </IconContext.Provider>
          </div>
        </div>
      </div>
    </div>
  )
}
