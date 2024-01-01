import {
  FaFacebook,
  FaInstagram,
  FaRegCircle,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa'

export const socialIconMap = (socialMedia) => {
  switch (socialMedia) {
    case 'facebook':
      return FaFacebook
    case 'twitter':
      return FaTwitter
    case 'tiktok':
      return FaTiktok
    case 'instagram':
      return FaInstagram
    case 'youtube':
      return FaYoutube
    default:
      return FaRegCircle
  }
}
