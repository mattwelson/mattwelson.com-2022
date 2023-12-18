import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { InferType } from "groqd";
import slugify from "slugify";
import { DateTime } from "luxon";
import { Layout, PostDescription } from "~/components/layout";
import { Image } from "~/components/image";
import { PortableText } from "~/components/sanity/PortableText";
import { Post } from "~/model/queries/post";
import { loadQuery, useQuery } from "~/model/sanity/sanity.loader";
import { PortableTextBlockComponent } from "@portabletext/react";

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
    initial: initial as any,
  });

  if (!data) throw new Error("No Posts Found");

  return (
    <Layout>
      <div className="mt-8" />
      <PostDescription post={data} />
      <PortableText value={data.content as any[]} />
    </Layout>
  );
}
