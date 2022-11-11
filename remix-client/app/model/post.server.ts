import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { getClient } from "~/lib/sanity";

interface Metaimage {
  caption: string;
  asset: SanityImageSource;
}

interface InstagramPost {
  _id: string;
  url: string;
  image: Metaimage;
}

export async function getInstagramPosts(): Promise<Array<InstagramPost>> {
  const instagramPosts = await getClient().fetch(
    `*[_type == "instagrampost"]{_id, image, url, _createdAt}[0...6]|order(_createdAt desc)`
  );
  return instagramPosts;
}

interface PostSummary {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

export async function getPostSummary(): Promise<Array<PostSummary>> {
  const posts = await getClient().fetch(
    `*[_type == "post"]{ _id, title, slug, _createdAt }|order(_createdAt desc)`
  );
  return posts;
}

interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  content: Array<any>;
}
export async function getPost({
  slug,
}: {
  slug: string;
}): Promise<Array<Post>> {
  const post = await getClient().fetch(
    `*[_type=="post" && slug.current == $slug]`,
    { slug }
  );
  return post;
}
