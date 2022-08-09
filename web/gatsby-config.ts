import type { GatsbyConfig } from "gatsby"

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const config: GatsbyConfig = {
  siteMetadata: {
    title: `mattwelson.com`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: process.env.GATSBY_SANITY_ID,
        dataset: process.env.GATSBY_SANITY_DATASET,
        watchMode: process.env.NODE_ENV === "development"
      },
    },
    {
      resolve: "gatsby-plugin-sanity-image",
      options: {
        projectId: process.env.GATSBY_SANITY_ID,
        dataset: process.env.GATSBY_SANITY_DATASET,
        customImageTypes: ["SanityMetaimage"],
        defaultImageConfig: {
          quality: 90,
        }
      },
    },
    "gatsby-plugin-postcss",
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
  ],
}

export default config
