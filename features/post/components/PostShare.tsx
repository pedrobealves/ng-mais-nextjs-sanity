import { Icon } from 'components/Icon'
import { FacebookShareButton, TwitterShareButton } from 'next-share'
import { FaFacebook, FaLink, FaTwitter } from 'react-icons/fa'

export default function PostShare({ url }) {
  const copylink = (e) => {
    navigator.clipboard.writeText(url)
  }

  return (
    <div className="flex flex-col justify-center items-start gap-2 md:pl-8 pl-0 divide-gray-200">
      <div className="px-14 py-6 bg-gray-200 rounded-xl flex-col justify-center items-start flex">
        <div className="flex justify-start items-center gap-5 text-primary-8">
          <TwitterShareButton url={url}>
            <Icon icon={FaTwitter} />
          </TwitterShareButton>
          <FacebookShareButton url={url} hashtag={'#miltensei'}>
            <Icon icon={FaFacebook} />
          </FacebookShareButton>
          <button onClick={copylink}>
            <Icon icon={FaLink} />
          </button>
        </div>
      </div>
    </div>
  )
}
