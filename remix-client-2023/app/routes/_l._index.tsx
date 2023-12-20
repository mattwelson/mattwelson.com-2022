import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { loadQuery } from "~/model/sanity/sanity.loader.server";
import { AllPosts } from "~/model/queries/post";
import { InferType } from "groqd";
import { Link, useLoaderData } from "@remix-run/react";
import { useQuery } from "~/model/sanity/sanity.loader";
import { Layout, PostDescription } from "~/components/layout";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({}: LoaderFunctionArgs) {
  return json({
    initial: await loadQuery<InferType<typeof AllPosts>>(AllPosts.query),
  });
}

export default function Index() {
  const { initial } = useLoaderData<typeof loader>();

  const { data } = useQuery<InferType<typeof AllPosts>>(
    AllPosts.query,
    undefined,
    { initial }
  );

  return (
    <>
      <div className="mt-8" />
      {data?.map((post) => (
        <PostDescription post={post} isLink key={post.slug} />
      ))}
    </>
  );
}
