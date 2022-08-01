import * as React from "react";
import { graphql, Link, PageProps } from "gatsby";
import Layout from "./layout";
import PostList from "../post/PostList";
import { getColour } from "../post/CategorySubtitle";

const PostLayout = ({
  data: { sanityCategory, otherCategories },
}: PageProps<Queries.GetCategoryQuery>) => {
  if (!sanityCategory) return "Something weird has happened!";
  // TODO: sort posts by created date desc
  return (
    <Layout>
      <div className="mt-16" />

      <h1
        className={`mb-4 text-3xl font-bold sm:text-4xl md:text-6xl ${getColour(
          sanityCategory.colour
        )}`}
      >
        {sanityCategory.title}
      </h1>
      <PostList childPosts={sanityCategory.posts} childPostTitle="" />
      {!!otherCategories.nodes?.length && <h2>Other categories</h2>}
      {!!otherCategories.nodes?.length &&
        otherCategories.nodes.map(({ fullSlug, title, colour }) => (
          <Link to={fullSlug} className={`mb-4 ${getColour(colour)}`}>
            {title}
          </Link>
        ))}
    </Layout>
  );
};

export default PostLayout;

export const query = graphql`
  query GetCategory($title: String!) {
    sanityCategory(title: { eq: $title }) {
      title
      colour
      posts {
        ...SanityPostDetailsListable
      }
    }
    otherCategories: allSanityCategory(filter: { title: { ne: $title } }) {
      nodes {
        fullSlug
        title
        colour
      }
    }
  }
`;
