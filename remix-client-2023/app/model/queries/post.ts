import { q, sanityImage } from "groqd";

export const AllPosts = q("*")
  .filterByType("post")
  .order("_createdAt desc")
  .grab$({
    title: q.string().optional(),
    date: ["_createdAt", q.string()],
    slug: ["slug.current", q.string().optional()],
    image: sanityImage("image").nullable(),
    category: q("category")
      .deref()
      .grab({ title: q.string(), colour: q.string() })
      .nullable(),
  });

export const Post = q("*")
  .filterByType("post")
  .filter("slug.current == $slug")
  .slice(0)
  .grab$({
    title: q.string().optional(),
    date: ["_createdAt", q.string()],
    slug: ["slug.current", q.string().optional()],
    image: sanityImage("image").nullable(),
    category: q("category")
      .deref()
      .grab({ title: q.string(), colour: q.string() })
      .nullable(),
    content: q.contentBlocks(),
  });
