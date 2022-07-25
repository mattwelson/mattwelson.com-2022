import type { GatsbyNode } from "gatsby"

// Add a parentPost field and resolve it for SanityPosts
// Note: @link didn't seem to work in this case
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions, schema }) => {
    const { createTypes } = actions
    const typeDefs = [
      `
  type SanityPost implements Node {
    parentPost: SanityPost
  }
  `,
      schema.buildObjectType({
        name: "SanityPost",
        fields: {
          parentPost: {
            type: "SanityPost",
            resolve: (source, _args, context) => {
              return context.nodeModel.findOne({
                type: "SanityPost",
                query: {
                  filter: {
                    childPosts: { elemMatch: { id: { eq: source.id } } },
                  },
                },
              })
            },
          },
        },
      }),
    ]

    createTypes(typeDefs)
  }
