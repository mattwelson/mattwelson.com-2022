import slugify from 'slugify';
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

      type SanityCategory implements Node {
        posts: [SanityPost!]
        fullSlug: String!
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
      schema.buildObjectType({
        name: "SanityCategory",
        fields: {
          fullSlug: {
            type: "String!",
            resolve: ({ title }) => `/category/${slugify(title, { lower: true })}`
          },
          posts: {
            type: ["SanityPost!"],
            resolve: async ({ title }: Queries.SanityCategory, args, context) => {
              const { entries } = (await context.nodeModel.findAll({
                type: "SanityPost",
                query: {
                  ...args,
                  filter: {
                    category: {
                      title: {
                        eq: title
                      }
                    }
                  },
                }
              }))
              return entries
            }
          }
        }
      })
    ];

    createTypes(typeDefs);
  };

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions: { createPage },
  reporter
}) => {
  const postTemplate = path.resolve(`./src/components/layouts/PostLayout.tsx`)
  const categoryTemplate = path.resolve(`./src/components/layouts/CategoryLayout.tsx`)
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
      allSanityCategory {
        categories: nodes {
          fullSlug
          title
        }
      }
    }
  `);
  rootPosts.data?.allSanityPost.posts.forEach(({ fullSlug, id }) => {
    if (!fullSlug) reporter.warn("No slug found for post")
    createPage({
      path: fullSlug,
      component: postTemplate,
      context: {
        id,
      },
    })
  });
  rootPosts.data?.allSanityCategory.categories.forEach(({ fullSlug, title }) => {
    if (!fullSlug) reporter.warn("No slug found for category")
    createPage({
      path: fullSlug,
      component: categoryTemplate,
      context: {
        title,
      },
    })
  });
};
