import { json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getClient } from "~/lib/sanity";

interface PostSummary {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

interface LoaderData {
  posts: Array<PostSummary>;
}

export const loader: LoaderFunction = async () => {
  const posts = await getClient().fetch(
    `*[_type == "post"]{ _id, title, slug, _createdAt }|order(_createdAt desc)`
  );
  return json<LoaderData>({ posts });
};

export default function Index() {
  const { posts } = useLoaderData() as LoaderData;
  return (
    <div className="">
      {posts?.map((p) => (
        <div key={p._id}>
          <Link to={p.slug.current}>{p.title}</Link>
        </div>
      ))}
    </div>
  );
}
