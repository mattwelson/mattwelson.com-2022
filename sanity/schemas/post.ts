export default {
  name: "post",
  type: "document",
  title: "Post",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Post Title",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "A partial slug to be used for the post, joined together if the posts are nested.",
      options: {
        source: "title",
      },
    },
    {
      name: "childPosts",
      type: "array",
      title: "Child Posts",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "post",
            },
          ],
        },
      ],
    },
    {
      name: "image",
      title: "Image",
      type: "metaimage",
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "metaimage",
        },
      ],
    },
  ],
}
