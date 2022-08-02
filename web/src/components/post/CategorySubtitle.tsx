import { Link } from "gatsby";
import * as React from "react";

// text-emerald-500
// text-purple-500
// text-lime-500
// text-slate-500
// text-red-500
// text-orange-500
// text-amber-500
// text-yellow-500
// text-lime-500
// text-green-500
// text-emerald-500
// text-teal-500
// text-cyan-500
// text-sky-500
// text-blue-500
// text-indigo-500
// text-violet-500
// text-purple-500
// text-fuchsia-500
// text-pink-500
// text-rose-500
// TODO: Workout how to make this a switch that contains the full text
export function getColour(colour: string, prefix = "text-") {
  return `${prefix}${colour}-500`;
}

const CategorySubtitle = ({
  post,
  categoryLink = true,
}: {
  post: Queries.SanityPostDetailsFeaturableFragment;
  categoryLink?: Boolean;
}) => {
  const { title, fullSlug }: { title: string; fullSlug: string } =
    post?.category ?? post?.ancestorPost;
  const Header = () => (
    <h3
      className={`text-lg font-bold ${getColour(
        post?.ancestorPost?.category?.colour ?? ""
      )}`}
    >
      {title}
    </h3>
  );
  return categoryLink ? (
    <Link to={fullSlug}>
      <Header />
    </Link>
  ) : (
    <Header />
  );
};

export default CategorySubtitle;
