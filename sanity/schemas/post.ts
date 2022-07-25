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
      name: "children",
      type: "array",
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
