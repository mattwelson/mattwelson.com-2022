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
      <title>{sanityCategory.title} || Matt Welson</title>
      <div className="mt-16" />

      <h1
        className={`mb-4 text-3xl font-bold sm:text-4xl md:text-6xl ${getColour(
          sanityCategory.colour
        )}`}
      >
        {sanityCategory.title}
      </h1>
      {!sanityCategory.posts?.length && (
        <h2 className="my-16 text-center font-semibold text-slate-400">
          Opps, I haven't started this yet.
        </h2>
      )}
      <PostList childPosts={sanityCategory.posts} childPostTitle="" />
      {!!otherCategories.nodes?.length && (
        <>
          <h2 className={`font-semibold uppercase text-slate-400`}>
            Other Categories
          </h2>
          <div className="mb-4 h-0.5 w-8 bg-slate-400"></div>
        </>
      )}
      {!!otherCategories.nodes?.length && (
        <div className="mb-8 flex gap-4">
          {otherCategories.nodes.map(({ fullSlug, title, colour }) => (
            <Link to={fullSlug} className={`font-bold ${getColour(colour)}`}>
              {title}
            </Link>
          ))}
        </div>
      )}
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
