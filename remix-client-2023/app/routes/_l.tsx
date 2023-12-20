import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { InferType } from "groqd";
import { Layout } from "~/components/layout";
import { InstagramPosts } from "~/model/queries/instagram";
import { loadQuery } from "~/model/sanity/sanity.loader.server";

export async function loader() {
  return json({
    instagramPosts: await loadQuery<InferType<typeof InstagramPosts>>(
      InstagramPosts.query
    ),
  });
}

export default function LayoutPage() {
  const { instagramPosts } = useLoaderData<typeof loader>();
  console.log({ instagramPosts });
  return (
    <Layout instagramPosts={instagramPosts.data}>
      <Outlet />
    </Layout>
  );
}
