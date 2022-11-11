import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { PortableText } from "~/lib/sanity";
import { getPost } from "~/model/post.server";

interface LoaderData {
  initialData: Awaited<ReturnType<typeof getPost>>;
}

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;
  invariant(slug);
  const initialData = await getPost({ slug });
  return json({ initialData });
};

export default function Post() {
  const { initialData } = useLoaderData() as LoaderData;
  const [first] = initialData;
  return (
    <article>
      <h1>{first.title}</h1>
      <div className="prose">
        <PortableText value={first.content}></PortableText>
      </div>
    </article>
  );
}
