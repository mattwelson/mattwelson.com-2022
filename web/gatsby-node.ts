import type { GatsbyNode } from "gatsby";
import path from "path";

// Find the highest ancestor of a post
async function getAncestorList(list: Array<any>, context: any): Promise<Array<Queries.SanityPost>> {
  const parent = await context.nodeModel.findOne({
    type: "SanityPost",
    query: {
      filter: {
        childPosts: { elemMatch: { id: { eq: list[0].id } } },
      },
    },
  })
  if (!parent) return list
  return getAncestorList([parent, ...list], context)
}

// Add a parentPost field and resolve it for SanityPosts
// Note: @link didn't seem to work in this case
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions, schema }) => {
    const { createTypes } = actions;
    const typeDefs = [
      `
      type SanityPost implements Node {
        parentPost: SanityPost
        ancestorPost: SanityPost
        fullSlug: String!
        isRoot: Boolean!
        isSet: Boolean!
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
          ancestorPost: {
            type: "SanityPost",
            resolve: async (source, _args, context) => {
              return (await getAncestorList([source], context))[0]
            }
          },
          fullSlug: {
            type: "String!",
            resolve: async (source, _args, context) => {
              return (await getAncestorList([source], context))
                .map(({ slug: { current } }) => current as string).reduce((acc, s) => `${acc}/${s}`, "")
            }
          },
          isRoot: {
            type: "Boolean!",
            resolve: async (source, _args, context) => {
              return !(await context.nodeModel.findOne({
                type: "SanityPost",
                query: {
                  filter: {
                    childPosts: { elemMatch: { id: { eq: source.id } } },
                  },
                },
              }));
            },
          },
          isSet: {
            type: "Boolean!",
            resolve: async (source, _args, context) => {
              return !!source.childPosts && !(await context.nodeModel.findOne({
                type: "SanityPost",
                query: {
                  filter: {
                    childPosts: { elemMatch: { id: { eq: source.id } } },
                  },
                },
              }));
            },
          }
        },
      }),
    ];

    createTypes(typeDefs);
  };

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions: { createPage },
  reporter
}) => {
  const template = path.resolve(`./src/components/layouts/PostLayout.tsx`)
  const rootPosts = await graphql<Queries.GetPostsForNodeQuery>(`
    query GetPostsForNode {
      allSanityPost {
        posts: nodes {
          id
          fullSlug
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
  rootPosts.data?.allSanityPost.posts.forEach(({ fullSlug, id }) => {
    if (!fullSlug) reporter.warn("No slug found for post")
    createPage({
      path: fullSlug,
      component: template,
      context: {
        id,
      },
    })
  });
};
