import { defineField, defineType } from 'sanity'

import Preview from './previews/spoiler'

export default defineType({
  title: 'Spoiler Content',
  name: 'spoilerContent',
  type: 'object',
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    },
  ],
  preview: {
    select: {
      content: 'content',
    },
  },
  components: {
    preview: Preview,
  },
})
