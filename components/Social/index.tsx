import { Icon, IconProps } from 'components/Icon'
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa'

export function Social({ color, hoverColor, size = 16 }: IconProps) {
  return (
    <div className="flex gap-3">
      {[
        { icon: FaTwitter, href: 'twitter-link' },
        { icon: FaFacebook, href: 'facebook-link' },
        { icon: FaInstagram, href: 'instagram-link' },
        { icon: FaTiktok, href: 'tiktok-link' },
      ].map((item, index) => (
        <a key={index} href={item.href} target="_blank">
          <Icon
            icon={item.icon}
            color={color}
            hoverColor={hoverColor}
            size={size}
          />
        </a>
      ))}
    </div>
  )
}
