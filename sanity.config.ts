/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */
import { codeInput } from '@sanity/code-input'
import { debugSecrets } from '@sanity/preview-url-secret/sanity-plugin-debug-secrets'
import { scheduledPublishing } from '@sanity/scheduled-publishing'
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
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import authorType from 'schemas/author'
import blockContentType from 'schemas/blockContent'
import categoryType from 'schemas/category'
import gameType from 'schemas/game'
import imageEmbedType from 'schemas/imageEmbed'
import newsType from 'schemas/news'
import postType from 'schemas/post'
import reviewType from 'schemas/review'
import settingsType from 'schemas/settings'
import spoilerType from 'schemas/spoiler'
import tagType from 'schemas/tag'
import twitterType from 'schemas/twitter'
import weeklyType from 'schemas/weekly'
import youtubeType from 'schemas/youtube'

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'ng+ studio'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title,
  document: {
    unstable_comments: {
      enabled: true,
    },
  },
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      postType,
      newsType,
      reviewType,
      tagType,
      authorType,
      weeklyType,
      gameType,
      settingsType,
      blockContentType,
      youtubeType,
      imageEmbedType,
      twitterType,
      spoilerType,
      categoryType,
    ],
  },
  plugins: [
    structureTool({
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
    // The remaining plugins are only loaded in dev mode
    process.env.NODE_ENV !== 'production' && debugSecrets(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    process.env.NODE_ENV !== 'production' &&
      visionTool({ defaultApiVersion: apiVersion }),
    scheduledPublishing(),
  ],
})
