import * as React from "react";
import { graphql, Link, PageProps } from "gatsby";
import Layout from "./layout";
import BigImage from "../images/BigImage";

// text-emerald-500
// TODO: Workout how to make this a switch that contains the full text
function getColour(colour: string, prefix = "text-") {
  return `${prefix}${colour}-500`;
}

// TODO: Move to own file
// TODO: Link to category OR link to ancestor, depending on what is rendered - more logic!
const CategorySubtitle = ({ sanityPost }: Queries.GetPostQuery) => {
  return (
    <h3
      className={`text-lg font-bold ${getColour(
        sanityPost?.ancestorPost.category.colour
      )}`}
    >
      {sanityPost?.category?.title ?? sanityPost.ancestorPost.title}
    </h3>
  );
};

const PostLayout = ({
  data: { sanityPost },
}: PageProps<Queries.GetPostQuery>) => {
  if (!sanityPost) return "Ooops no post!";
  return (
    <Layout>
      <div className="mt-16" />
      <CategorySubtitle sanityPost={sanityPost} />
      <h1 className="mb-4 font-serif text-4xl font-bold md:text-6xl">
        {sanityPost.title}
      </h1>
      {sanityPost.image && <BigImage image={sanityPost.image} />}
      <p>
        LOREM IPSUM this is a long paragraph of text that is very long and has
        some sentences. This will go on for a little while and hopefully full
        the lines. This will be replaced by block content shortly.
      </p>
      <h2 className="font-serif text-lg font-bold">
        {sanityPost.childPostsTitle}
      </h2>
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
      category {
        title
        colour
      }
    }
    parentPost {
      title
    }
    childPostsTitle
    fullSlug
    category {
      title
    }
  }

  fragment SanityPostDetailsChild on SanityPost {
    id
    title
    childPostsTitle
    fullSlug
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
