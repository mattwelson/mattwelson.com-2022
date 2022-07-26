export default {
  name: "metaimage",
  title: "Image",
  type: "image",
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: "caption",
      type: "string",
      title: "Caption",
      options: {
        isHighlighted: true,
        metadata: ["palette"],
      },
    },
  ],
}
