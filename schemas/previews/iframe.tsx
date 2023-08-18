// youtube.js
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

import getYouTubeId from 'get-youtube-id'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'

export default function Preview(props) {
  const { url, renderDefault } = props
  if (!url) {
    return <div>Missing YouTube URL</div>
  }
  const id = getYouTubeId(url)
  return (
    <div>
      {renderDefault({ ...props, title: 'YouTube Embed' })}
      <LiteYouTubeEmbed id={id} title="YouTube Embed" />
    </div>
  )
}
