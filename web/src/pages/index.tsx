import * as React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/layouts/layout";
import PostList from "../components/post/PostList";
import FeaturedPost from "../components/post/FeaturedPost";

const IndexPage = ({ data }: PageProps<Queries.GetRootPostsQuery>) => {
  const [firstPost, ...otherPosts] = data.posts.nodes;
  const [firstSet, ...otherSets] = data.sets.nodes;
  return (
    <Layout>
      <title>Matt Welson</title>
      <div className="mt-16" />
      {/* TODO: Featured set post */}
      {firstSet && <FeaturedPost post={firstSet} />}
      {/* TODO: Featured blog post */}
      {firstPost && <FeaturedPost post={firstPost} />}
      {/* TODO: Set posts */}
      {!!otherSets.length && (
        <PostList childPosts={otherSets} childPostTitle="Recent collections" />
      )}
      {/* TODO: Blog posts */}
      {!!otherPosts.length && (
        <PostList childPosts={otherPosts} childPostTitle="Recent posts" />
      )}
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query GetRootPosts {
    posts: allSanityPost(
      sort: { order: DESC, fields: _createdAt }
      filter: { isSet: { eq: false } }
    ) {
      nodes {
        ...SanityPostDetailsFull
      }
    }
    sets: allSanityPost(
      sort: { order: DESC, fields: _createdAt }
      filter: { isSet: { eq: true } }
    ) {
      nodes {
        ...SanityPostDetailsFull
      }
    }
  }
`;
