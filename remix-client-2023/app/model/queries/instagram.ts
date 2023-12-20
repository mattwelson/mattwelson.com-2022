import { q, sanityImage } from "groqd";

export const InstagramPosts = q("*")
  .filterByType("instagrampost")
  .order("_createdAt desc")
  .slice(0, 5)
  .grab$({
    url: q.string(),
    image: sanityImage("image"),
  });
