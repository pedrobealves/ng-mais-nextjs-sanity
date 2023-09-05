import Image from 'next/image'

export default function ImagePreview(props) {
  const { url, alt, renderDefault } = props
  if (!url) {
    return <div>Missing Image URL</div>
  }
  return (
    <div>
      {renderDefault({ ...props, title: 'Image Embed' })}
      <Image src={`${url}`} width={500} height={500} alt={alt} />
    </div>
  )
}
