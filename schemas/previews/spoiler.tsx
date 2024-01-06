import {
  PortableText,
  type PortableTextReactComponents,
} from '@portabletext/react'

export default function Preview(props) {
  const { content } = props || {}

  return <div>{content}</div>
}
