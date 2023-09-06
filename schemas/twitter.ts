import { defineField, defineType } from 'sanity'

import Preview from './previews/twitter'

export default defineType({
  name: 'twitter',
  type: 'object',
  title: 'Twitter Embed',
  fields: [
    {
      name: 'id',
      type: 'string',
      title: 'Twitter tweet id',
    },
  ],
  preview: {
    select: {
      tweetId: 'id',
    },
  },
  components: {
    preview: Preview,
  },
})
