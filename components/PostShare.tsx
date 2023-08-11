import { FacebookShareButton, TwitterShareButton } from 'next-share'
import { IconContext } from 'react-icons'
import { FaLink } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'

export default function PostShare({ url }) {
  const copylink = (e) => {
    navigator.clipboard.writeText(url)
  }

  return (
    <div className="flex flex-col justify-center items-start gap-2 md:pl-8 pl-0 divide-gray-200">
      <div className="px-14 py-6 bg-gray-200 rounded-xl flex-col justify-center items-start flex">
        <div className="flex justify-start items-center gap-5 text-primary-8">
          <IconContext.Provider value={{ size: '24' }}>
            <TwitterShareButton url={url}>
              <FaTwitter className="hover:text-primary-5" />
            </TwitterShareButton>
            <FacebookShareButton url={url} hashtag={'#miltensei'}>
              <FaFacebook className="hover:text-primary-5" />
            </FacebookShareButton>
            <button onClick={copylink}>
              <FaLink className="hover:text-primary-5" />
            </button>
          </IconContext.Provider>
        </div>
      </div>
    </div>
  )
}
