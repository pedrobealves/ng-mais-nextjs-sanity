import { CogIcon } from '@sanity/icons'
import * as demo from 'lib/demo.data'
import { defineArrayMember, defineField, defineType } from 'sanity'

import OpenGraphInput from './OpenGraphInput'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  preview: { select: { title: 'title', subtitle: 'description' } },
  fieldsets: [
    {
      title: 'Social Media',
      name: 'social',
    },
  ],
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your blog.',
      title: 'Title',
      type: 'string',
      initialValue: demo.title,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      description:
        'Used both for the <meta> description tag for SEO, and the blog subheader.',
      title: 'Description',
      type: 'array',
      initialValue: demo.description,
      of: [
        defineArrayMember({
          type: 'block',
          options: {},
          styles: [],
          lists: [],
          marks: {
            decorators: [],
            annotations: [
              defineField({
                type: 'object',
                name: 'link',
                fields: [
                  {
                    type: 'string',
                    name: 'href',
                    title: 'URL',
                    validation: (rule) => rule.required(),
                  },
                ],
              }),
            ],
          },
        }),
      ],
      validation: (rule) => rule.max(155).required(),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      description:
        'Used for social media previews when linking to the index page.',
      type: 'object',
      components: {
        input: OpenGraphInput as any,
      },
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: demo.ogImageTitle,
        }),
      ],
    }),
    defineField({
      name: 'social',
      type: 'array',
      title: 'Social Links',
      description: 'Enter your Social Media URLs',
      validation: (Rule) => Rule.unique(),
      of: [
        {
          type: 'object',
          fields: [
            {
              type: 'string',
              name: 'media',
              title: 'Choose Social Media',
              options: {
                list: [
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Tiktok', value: 'tiktok' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Youtube', value: 'youtube' },
                ],
              },
            },
            {
              type: 'url',
              name: 'url',
              title: 'Full Profile URL',
              validation: (rule) => rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'media',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'linktree',
      type: 'array',
      title: 'Links linktree',
      description: 'Enter your buttons for linktree',
      validation: (Rule) => Rule.unique(),
      of: [
        {
          type: 'object',
          fields: [
            {
              type: 'string',
              name: 'title',
              title: 'Choose title',
            },
            {
              type: 'url',
              name: 'url',
              title: 'Full URL',
              validation: (rule) => rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'privacyPolicy',
      title: 'Privacy Policy',
      type: 'blockContent',
    }),
    defineField({
      name: 'termsConditions',
      title: 'Terms and Conditions',
      type: 'blockContent',
    }),
  ],
})
