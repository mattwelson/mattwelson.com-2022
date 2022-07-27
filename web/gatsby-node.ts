import type { GatsbyNode } from "gatsby";
import path from "path";

// Add a parentPost field and resolve it for SanityPosts
// Note: @link didn't seem to work in this case
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions, schema }) => {
    const { createTypes } = actions;
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
              });
            },
          },
        },
      }),
    ];

    createTypes(typeDefs);
  };

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions: { createPage },
}) => {
  const template = path.resolve(`./src/components/layouts/PostLayout.tsx`)
  // TODO:
  // Query for allSanityPosts
  // Iterate over all that do not have a parent as a "root" page,
  // then iterate over remaining with their full paths (recursion?)
  // how do I get the childPosts recursively?
  const rootPosts = await graphql<Queries.GetRootPostsQuery>(`
    query GetRootPostsClone {
      allSanityPost {
        posts: nodes {
          id
          slug {
            current
          }
          parentPost {
            id
          }
          childPosts {
            id
          }
        }
      }
    }
  `);
  rootPosts.data?.allSanityPost.posts.forEach(({ slug, id }) => {
    if (!slug?.current) return
    createPage({
      path: `/${slug?.current}`,
      component: template,
      context: {
        id,
      },
    })
  });
};
