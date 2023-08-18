// Renders the Open Graph image used on the home page

export const width = 64
export const height = 64

export function OpenGraphImage(props: { title: string }) {
  const { title } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      version="1.1"
      viewBox="0 0 691.185 691.185"
      xmlSpace="preserve"
    >
      <defs>
        <linearGradient id="linearGradient7011">
          <stop offset="0" stopColor="#ff6d00" stopOpacity="1"></stop>
          <stop offset="1" stopColor="#ff8500" stopOpacity="1"></stop>
        </linearGradient>
        <radialGradient
          id="radialGradient53428"
          cx="1493.351"
          cy="387.091"
          r="345.593"
          fx="1493.351"
          fy="387.091"
          gradientTransform="translate(-1504.507 -36.664)"
          gradientUnits="userSpaceOnUse"
          xlinkHref="#linearGradient7011"
        ></radialGradient>
      </defs>
      <g
        fillOpacity="1"
        stroke="none"
        strokeDasharray="none"
        strokeDashoffset="0"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="4"
        strokeOpacity="1"
        transform="translate(356.749 -4.834)"
      >
        <rect
          style={{ fontVariationSettings: 'normal' }}
          width="691.185"
          height="691.185"
          x="-356.749"
          y="4.834"
          fill="url(#radialGradient53428)"
          strokeWidth="5.742"
          display="inline"
          opacity="1"
          rx="6.793"
          ry="3.97"
          stopColor="#000"
          stopOpacity="1"
        ></rect>
        <g
          fill="#fff"
          strokeWidth="0.083"
          display="inline"
          transform="translate(167.753 993.658)"
        >
          <path
            style={{ fontVariationSettings: 'normal' }}
            d="M20.284-475.924c-48.146 63.574-123.732 100.365-203.47 99.038-79.736-1.328-154.056-40.615-200.118-105.948l.052 31.55c-60.563-53.78-83.01-138.873-57.006-215.631l-24.643 16.774c12.424-47.2 40.868-88.843 80.294-117.722l-27.457 4.327c35.793-56.248 98.46-89.959 164.995-88.612l-.232-50.333a857.911 857.911 0 00102.698 60.709c37.45 18.182 55.374 62.846 40.727 102.958-51.506-41.099-126.774-33.095-168.618 18.122-41.844 51.217-34.678 126.57 16.07 168.981s126.176 36.084 169.15-14.189c42.973-50.273 37.486-125.766-12.411-169.37 23.254 7.442 46.234 20.422 64.754 36.521l-23.545 189.105.827 48.782z"
            display="inline"
            opacity="1"
            stopColor="#000"
            stopOpacity="1"
            vectorEffect="none"
          ></path>
          <path
            style={{ fontVariationSettings: 'normal' }}
            d="M-99.685-735.27c49.897 43.604 55.383 119.098 12.41 169.37-42.973 50.273-118.4 56.6-169.149 14.19a120.91 120.91 0 01-19.618-20.815l-17.474 8.88 15.202 43.265 106.406 22.216 113.597-1.768-.165-9.712L-34.93-698.75c-18.52-16.099-41.5-29.079-64.754-36.522z"
            display="inline"
            opacity="1"
            stopColor="#000"
            stopOpacity="1"
            vectorEffect="none"
          ></path>
          <path
            style={{ fontVariationSettings: 'normal' }}
            d="M-261.778-732.184c-53.563 49.932-73.902 126.07-52.376 196.062 21.526 69.991 81.137 121.54 153.501 132.743 72.365 11.203 144.772-19.91 186.253-79.98l-56.592 12.178-70.965-80.257a120.7 120.7 0 01-77.066 27.812 120.7 120.7 0 01-120.7-120.7 120.7 120.7 0 0137.962-87.839z"
            opacity="1"
            stopColor="#000"
            stopOpacity="1"
            vectorEffect="none"
          ></path>
          <path
            style={{ fontVariationSettings: 'normal' }}
            d="M-298.99-657.65c-11.624 99.296 57.686 189.885 156.566 204.633 98.88 14.748 191.607-51.673 209.303-149.808l-43.714 24.5-84.285-18.898c-18.082 46.31-68.187 73.593-117.903 73.597-66.66 0-120.7-54.04-120.7-120.7.03-4.446.305-8.886.825-13.3z"
            display="inline"
            opacity="1"
            stopColor="#000"
            stopOpacity="1"
            vectorEffect="none"
          ></path>
          <path
            style={{ fontVariationSettings: 'normal' }}
            d="M45.607-731.987l-12.02 40.765c-21.14 16.41-73.852 22.725-73.786 51.865 0 66.66-72.163 115.73-138.824 115.73a120.701 120.701 0 01-93.404-44.385l-.086.035c53.636 69.702 149.457 91.049 227.61 50.708 78.151-40.341 116.25-130.817 90.51-214.717z"
            opacity="1"
            stopColor="#000"
            stopOpacity="1"
            vectorEffect="none"
          ></path>
          <path
            style={{ fontVariationSettings: 'normal' }}
            d="M-95.332-861.573c71.819 79.095 78.744 197.361 16.79 284.188l-.057.01a120.7 120.7 0 01-100.424 53.75 120.7 120.7 0 01-78.207-28.872l-.8.111c56.002 45.996 134.265 53.541 198.022 19.09 63.758-34.451 100.336-104.05 92.551-176.1-7.784-72.05-58.384-132.231-127.875-152.175z"
            display="inline"
            opacity="1"
            stopColor="#000"
            stopOpacity="1"
            vectorEffect="none"
          ></path>
        </g>
      </g>
    </svg>
  )
}
