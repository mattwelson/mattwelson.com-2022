import { Link } from "@remix-run/react";
import { InferType } from "groqd";
import { DateTime } from "luxon";
import slugify from "slugify";
import { AllPosts, Post } from "~/model/queries/post";
import { Image } from "~/components/image";

export function PostDescription({
  post: { category, image, title, date, slug },
  isLink = false,
}: {
  post: InferType<typeof Post> | InferType<typeof AllPosts>[0];
  isLink?: boolean;
}) {
  return (
    <>
      <div className="mt-8">
        <Link
          to={`/category/${slugify(category?.title ?? "", {
            lower: true,
          })}`}
          className="no-underline"
        >
          <h3 className={`text-${category?.colour}-500 mb-2`}>
            {category?.title}
          </h3>
        </Link>
        {isLink ? (
          <Link to={`/post/${slug}`} className="no-underline">
            <h1 className="lead mb-2">{title}</h1>
          </Link>
        ) : (
          <h1 className="lead mb-2">{title}</h1>
        )}
        <h4 className="mt-0 text-slate-700">
          {DateTime.fromISO(date).toFormat("dd MMMM yyyy")}
        </h4>
      </div>
      <Image
        image={image}
        className="!col-start-1 col-end-[-1] justify-self-center"
      />
    </>
  );
}

// So tailwind loads the classes
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
