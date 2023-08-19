import { defineField, defineType } from 'sanity'

import iframe from './previews/iframe'

export default defineType({
  name: 'youtube',
  type: 'object',
  title: 'YouTube Embed',
  fields: [
    {
      name: 'url',
      type: 'url',
      description:
        'Enter the URL to Embed \r\n(eg: https://youtube.com/embed/xxx or https://open.spotify.com/embed/track/xxxx)',
      validation: (rule) => rule.required(),
    },
  ],
  preview: {
    select: {
      url: 'url',
    },
  },
  components: {
    preview: iframe,
  },
})
