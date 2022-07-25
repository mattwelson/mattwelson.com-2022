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
  ],
}
