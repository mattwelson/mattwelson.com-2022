import { createClient } from '@sanity/client/stega'
import { setServerClient, loadQuery } from './sanity.loader'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true,
  apiVersion: process.env.SANITY_API_VERSION,
  stega: {
    enabled: true,
    studioUrl: process.env.SANITY_STUDIO_URL,
  },
})

setServerClient(client)

// Re-export for convenience
export { loadQuery }