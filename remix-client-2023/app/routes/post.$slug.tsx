import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { InferType } from "groqd";
import { Layout } from "~/components/layout";
import { PortableText } from "~/components/sanity/PortableText";
import { Post } from "~/model/queries/post";
import { loadQuery, useQuery } from "~/model/sanity/sanity.loader";

export async function loader({ params }: LoaderFunctionArgs) {
  return json({
    initial: await loadQuery<InferType<typeof Post>>(Post.query, {
      slug: params.slug,
    }),
  });
}

export default function Index() {
  const { initial } = useLoaderData<typeof loader>();

  const { data } = useQuery<InferType<typeof Post>>(Post.query, undefined, {
    initial,
  });

  console.log({ data });

  if (!data) throw new Error("No Posts Found");

  return (
    <Layout>
      <h1 className="text-3xl font-bold">{data?.title}</h1>
      <PortableText value={data.content} />
    </Layout>
  );
}
