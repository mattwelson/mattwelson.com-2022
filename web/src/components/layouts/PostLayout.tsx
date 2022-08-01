import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { PortableText } from "@portabletext/react";
import Layout from "./layout";
import HeroSection from "../post/HeroSection";
import PostList from "../post/PostList";

const PostLayout = ({
  data: { sanityPost },
}: PageProps<Queries.GetPostQuery>) => {
  if (!sanityPost) return "Ooops no post!";
  console.log({ content: sanityPost._rawContent });
  return (
    <Layout>
      <div className="mt-16" />
      <HeroSection post={sanityPost} />
      {sanityPost._rawContent && (
        <PortableText value={sanityPost._rawContent} />
      )}
      {!!sanityPost.childPosts?.length && (
        <PostList
          childPosts={sanityPost.childPosts}
          childPostTitle={sanityPost.childPostsTitle}
        />
      )}
    </Layout>
  );
};

export default PostLayout;

export const query = graphql`
  fragment SanityPostDetailsFull on SanityPost {
    id
    title
    image {
      caption
      ...ImageWithPreview
    }
    ancestorPost {
      title
      fullSlug
      category {
        title
        colour
        fullSlug
      }
    }
    parentPost {
      title
    }
    childPostsTitle
    fullSlug
    category {
      title
      fullSlug
    }
    _rawContent(resolveReferences: { maxDepth: 10 })
  }

  query GetPost($id: String!) {
    sanityPost(id: { eq: $id }) {
      ...SanityPostDetailsFull
      childPosts {
        ...SanityPostDetailsListable
      }
    }
  }
`;
