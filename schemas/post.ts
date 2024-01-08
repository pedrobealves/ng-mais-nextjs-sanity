import { BookIcon } from '@sanity/icons'
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'

import authorType from './author'
import gameType from './game'
import youtube from './youtube'

export default defineType({
  name: 'post',
  title: 'Post',
  icon: BookIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'showCover',
      title: 'Show cover image',
      description: 'This will show the cover image.',
      initialValue: true,
      type: 'boolean',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: authorType.name }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'game',
      title: 'Game',
      description: 'Se possui, selecione o jogo que este post pertence',
      type: 'reference',
      to: [{ type: gameType.name }],
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      description: 'Tipo de postagem',
      options: {
        list: [
          { title: 'Matéria', value: 'default' },
          { title: 'Artigos MIL', value: 'special' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'drop',
      title: 'Mark as Drop',
      description: 'This will mark the post as a drop.',
      initialValue: false,
      type: 'boolean',
    }),
  ],
  initialValue: {
    type: 'default',
  },
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      date: 'date',
      media: 'coverImage',
    },
    prepare({ title, media, author, date }) {
      const subtitles = [
        author && `by ${author}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return { title, media, subtitle: subtitles.join(' ') }
    },
  },
})
