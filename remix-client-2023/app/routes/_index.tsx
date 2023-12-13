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
import { Layout } from "~/components/layout";

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
    <Layout>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      {data?.map((post) => (
        <div key={post.slug}>
          <Link to={`/post/${post.slug}`}>
            <h2 className="text-xl font-bold">{post.title}</h2>
          </Link>
        </div>
      ))}
    </Layout>
  );
}
