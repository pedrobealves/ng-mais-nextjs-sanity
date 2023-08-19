import { defineField, defineType } from 'sanity'

import iframe from './previews/images'

export default defineType({
  name: 'imageEmbed',
  type: 'object',
  title: 'Image Embed',
  fields: [
    {
      name: 'url',
      type: 'url',
      description: 'Enter the URL to Embed',
      validation: (rule) => rule.required(),
    },
    {
      name: 'alt',
      type: 'string',
      description: 'Enter the Alt Text',
      validation: (rule) => rule.required(),
    },
    {
      name: 'caption',
      type: 'string',
      title: 'Image caption',
      description: 'Caption displayed below the image.',
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
