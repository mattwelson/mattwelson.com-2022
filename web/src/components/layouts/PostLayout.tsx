import * as React from "react";
import { graphql, Link, PageProps } from "gatsby";
import Layout from "./layout";

const PostLayout = ({
  data: { sanityPost },
}: PageProps<Queries.GetPostQuery>) => (
  <Layout>
    <h1 className="font-serif text-xl font-bold">{sanityPost.title}</h1>
    <h3>{sanityPost.category?.title}</h3>
    <h2 className="font-serif text-lg font-bold">
      {sanityPost.childPostsTitle}
    </h2>
  </Layout>
);

export default PostLayout;

export const query = graphql`
  fragment SanityPostDetailsFull on SanityPost {
    id
    title
    category {
      colour
      title
    }
    parentPost {
      title
    }
    childPostsTitle
    slug {
      current
    }
  }

  fragment SanityPostDetailsChild on SanityPost {
    id
    title
    childPostsTitle
  }

  query GetPost($id: String!) {
    sanityPost(id: { eq: $id }) {
      ...SanityPostDetailsFull
      childPosts {
        ...SanityPostDetailsChild
        childPosts {
          ...SanityPostDetailsChild
        }
      }
    }
  }
`;
