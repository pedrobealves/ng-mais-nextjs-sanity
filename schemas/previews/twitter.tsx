import { TwitterTweetEmbed } from 'react-twitter-embed'

export default function Preview(props) {
  const { tweetId, renderDefault } = props || {}

  if (!tweetId) {
    return <div>Missing Twitter Tweet ID</div>
  }

  return (
    <TwitterTweetEmbed tweetId={tweetId} options={{ conversation: 'none' }} />
  )
}
