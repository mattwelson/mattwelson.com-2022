import * as React from "react";
import { graphql, Link } from "gatsby";
import BigImage from "../images/BigImage";
import HeroSection from "./HeroSection";

const FeaturedPost = ({
  post,
  className = "",
}: {
  post: Queries.SanityPostDetailsFeaturableFragment;
  className?: string;
}) => {
  return (
    <Link
      to={post.fullSlug}
      className={`${className} mb-16 grid items-center text-2xl font-bold `}
    >
      <HeroSection post={post} showCaption={false} categoryLink={false} />
    </Link>
  );
};

export default FeaturedPost;

export const sanityPostDetailsListable = graphql`
  fragment SanityPostDetailsFeaturable on SanityPost {
    date: _createdAt(formatString: "D MMMM yyyy")
    isRoot
    id
    title
    fullSlug
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
    category {
      title
    }
  }
`;
