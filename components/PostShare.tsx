import { IconContext } from '@react-icons/all-files'
import { FaFacebook } from '@react-icons/all-files/fa/FaFacebook'
import { FaLink } from '@react-icons/all-files/fa/FaLink'
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter'
import { FacebookShareButton } from 'next-share'

export default function PostShare({ url }) {
  {
    console.log(url)
  }

  return (
    <div className="flex flex-col justify-center items-start gap-2">
      <div className="px-14 py-6 bg-gray-200 rounded-xl flex-col justify-center items-start flex">
        <div className="flex justify-start items-center gap-5 text-primary-8">
          <IconContext.Provider value={{ size: '24' }}>
            <a href="" target="_blank">
              <FaTwitter className="hover:text-primary-5" />
            </a>
            <FacebookShareButton
              url={'https://github.com/next-share'}
              quote={
                'next-share is a social share buttons for your next React apps.'
              }
              hashtag={'#nextshare'}
            >
              <FaFacebook className="hover:text-primary-5" />
            </FacebookShareButton>
            <a href="" target="_blank">
              <FaLink className="hover:text-primary-5" />
            </a>
          </IconContext.Provider>
        </div>
      </div>
    </div>
  )
}
