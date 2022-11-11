import { json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPostSummary } from "~/model/post.server";

interface LoaderData {
  posts: Awaited<ReturnType<typeof getPostSummary>>;
}

export const loader: LoaderFunction = async () => {
  const posts = await getPostSummary();
  return json<LoaderData>({ posts });
};

export default function Index() {
  const { posts } = useLoaderData() as LoaderData;
  return (
    <div className="">
      {posts?.map((p) => (
        <div key={p._id}>
          <Link to={p.slug.current} prefetch="intent">
            {p.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
