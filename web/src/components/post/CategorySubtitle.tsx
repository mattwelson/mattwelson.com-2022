import { Link } from "gatsby";
import * as React from "react";

// text-emerald-500
// text-purple-500
// TODO: Workout how to make this a switch that contains the full text
export function getColour(colour: string, prefix = "text-") {
  return `${prefix}${colour}-500`;
}

// TODO: Move to own file
// TODO: Link to category OR link to ancestor, depending on what is rendered - more logic!
const CategorySubtitle = ({
  post,
}: {
  post: Queries.SanityPostDetailsFeaturableFragment;
}) => {
  const { title, fullSlug }: { title: string; fullSlug: string } =
    post?.category ?? post?.ancestorPost;
  return (
    <Link to={fullSlug}>
      <h3
        className={`text-lg font-bold ${getColour(
          post?.ancestorPost.category.colour
        )}`}
      >
        {title}
      </h3>
    </Link>
  );
};

export default CategorySubtitle;
