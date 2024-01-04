/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */
import { codeInput } from '@sanity/code-input'
import { visionTool } from '@sanity/vision'
import {
  apiVersion,
  dataset,
  DRAFT_MODE_ROUTE,
  projectId,
} from 'lib/sanity.api'
import { locate } from 'plugins/locate'
import { previewDocumentNode } from 'plugins/previewPane'
import { settingsPlugin, settingsStructure } from 'plugins/settings'
import { defineConfig } from 'sanity'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { deskTool } from 'sanity/desk'
import { presentationTool } from 'sanity/presentation'
import authorType from 'schemas/author'
import blockContentType from 'schemas/blockContent'
import categoryType from 'schemas/category'
import gameType from 'schemas/game'
import imageEmbedType from 'schemas/imageEmbed'
import newsType from 'schemas/news'
import postType from 'schemas/post'
import reviewType from 'schemas/review'
import settingsType from 'schemas/settings'
import twitterType from 'schemas/twitter'
import weeklyType from 'schemas/weekly'
import youtubeType from 'schemas/youtube'

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'MILtensei studio'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      postType,
      newsType,
      reviewType,
      authorType,
      categoryType,
      weeklyType,
      gameType,
      settingsType,
      blockContentType,
      youtubeType,
      imageEmbedType,
      twitterType,
    ],
  },
  plugins: [
    deskTool({
      structure: settingsStructure(settingsType),
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      defaultDocumentNode: previewDocumentNode(),
    }),
    presentationTool({
      locate,
      previewUrl: {
        draftMode: {
          enable: DRAFT_MODE_ROUTE,
        },
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    settingsPlugin({ type: settingsType.name }),
    codeInput(),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
