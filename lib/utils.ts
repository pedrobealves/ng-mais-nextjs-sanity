import { toHTML } from '@portabletext/to-html'
import { type ClassValue, clsx } from 'clsx'
import { urlSimpleForImage } from 'lib/sanity.image'
import { PortableTextBlock } from 'sanity'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toHtml(content: PortableTextBlock) {
  return toHTML(content, {
    components: {
      types: {
        image: ({ value }) => `<img src="${urlSimpleForImage(value)}" />`,
        html: ({ value }) => value.code,
        spoilerContent: ({ value }) =>
          `<div class="spoiler">${toHtml(value.content)}</div>`,
        youtube: ({ value }) => `<iframe src="${value.url}" />`,
        twitter: () => '',
      },
    },
  })
}

export function toPlainText(blocks = []) {
  return (
    blocks
      // loop through each block
      .map((block) => {
        // if it's not a text block with children,
        // return nothing
        if (block._type !== 'block' || !block.children) {
          return ''
        }
        // loop through the children spans, and join the
        // text strings
        return block.children.map((child) => child.text).join('')
      })
      // join the paragraphs leaving split by two linebreaks
      .join('\n\n')
  )
}
