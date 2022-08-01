import * as React from "react";
import { graphql, Link } from "gatsby";
import SanityImage from "gatsby-plugin-sanity-image";

const PostList = ({
  childPosts,
  childPostTitle,
  className = "",
}: {
  childPosts: Array<Queries.SanityPostDetailsListableFragment>;
  childPostTitle: string;
  className?: string;
}) => {
  return (
    <div className={`${className} `}>
      <h3 className="mt-4 font-semibold uppercase text-slate-400">
        {childPostTitle ?? "Related"}
      </h3>
      {!!childPostTitle && <div className="mb-4 h-0.5 w-8 bg-slate-400"></div>}
      {childPosts.map((post) => (
        <Link
          to={post.fullSlug}
          className="mb-16 grid items-center gap-4 text-2xl font-bold md:grid-cols-[2fr_1fr] md:gap-8"
          key={post.fullSlug}
        >
          <h3 className="md:order-1">{post.title}</h3>
          <SanityImage
            alt={post.image?.caption}
            {...post.image}
            className="md:-ml-8 md:w-[calc(100%+2rem)] md:max-w-none"
          />
        </Link>
      ))}
    </div>
  );
};

export default PostList;

export const sanityPostDetailsListable = graphql`
  fragment SanityPostDetailsListable on SanityPost {
    id
    title
    childPostsTitle
    fullSlug
    image {
      caption
      ...ImageWithPreview
    }
  }
`;
