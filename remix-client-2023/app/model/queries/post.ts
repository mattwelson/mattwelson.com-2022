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
    content: q("content")
      .filter()
      .select({
        '_type == "block"': ["{...}", q.contentBlock()],
        '_type == "spotify"': [
          "{...}",
          q.object({
            url: q.string(),
            _key: q.string(),
            _type: q.literal("spotify"),
          }),
        ],
        '_type == "metaimage"': ["{...}", sanityImage("")],
        // reference type is the inline instagram type
        '_type == "reference"': ["{...}->", q.object({})],
        '_type == "youtube"': [
          "{...}",
          q.object({
            url: q.string(),
            _key: q.string(),
            _type: q.literal("youtube"),
          }),
        ],
        default: {
          _key: q.string(),
          _type: ['"unsupported"', q.literal("unsupported")],
          unsupportedType: ["_type", q.string()],
        },
      })
      .nullable(),
  });
