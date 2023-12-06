// sanity.config.js
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas/schema'

export default defineConfig({
  name: 'blog-2022',
  title: 'blog-2022',
  projectId: 'tqppuesf',
  dataset: 'production',
  plugins: [
    deskTool(),visionTool()
  ],
  schema: {
    types: schemaTypes,
  },
})