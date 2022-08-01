import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: process.env.GATSBY_SANITY_ID,
  dataset: process.env.GATSBY_SANITY_DATASET,
  useCdn: true,
  apiVersion: "2022-08-01"
})

export default client