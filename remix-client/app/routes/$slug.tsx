import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getClient } from "~/lib/sanity/getClient";

export const loader: LoaderFunction = async ({ params }) => {
  const initialData = await getClient().fetch(
    `*[_type=="post" && slug.current == $slug]`,
    { slug: params.slug }
  );
  return json({ initialData });
};

export default function Post() {
  const { initialData } = useLoaderData();
  const [first] = initialData;
  return <div>{first.title}</div>;
}
