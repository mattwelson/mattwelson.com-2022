import * as React from "react";
import BigImage from "../images/BigImage";
import CategorySubtitle from "./CategorySubtitle";

const HeroSection = ({
  post,
  showCaption = true,
  categoryLink = true,
}: {
  post: Queries.SanityPostDetailsFeaturableFragment;
  showCaption?: Boolean;
  categoryLink?: Boolean;
}) => (
  <>
    <CategorySubtitle post={post} categoryLink={categoryLink} />
    <h1 className="mb-4 font-serif text-3xl font-bold sm:text-4xl md:text-6xl">
      {post.title}
    </h1>
    {post.image && <BigImage image={post.image} showCaption={showCaption} />}
  </>
);

export default HeroSection;
