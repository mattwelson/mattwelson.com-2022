import {
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { Layout } from "./components/layout";
import { getInstagramPosts } from "./model/post.server";

import styles from "./tailwind.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

interface LoaderData {
  instagramPosts: Awaited<ReturnType<typeof getInstagramPosts>>;
}

export const loader: LoaderFunction = async () => {
  const instagramPosts = await getInstagramPosts();
  return json<LoaderData>({ instagramPosts });
};

export default function App() {
  const { instagramPosts } = useLoaderData() as LoaderData;
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout instagramPosts={instagramPosts}>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
