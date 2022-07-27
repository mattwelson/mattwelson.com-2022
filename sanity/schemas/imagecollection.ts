export default {
  name: "imagecollection",
  title: "Image Collection",
  type: "object",
  fields: [
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "metaimage" }],
    },
    {
      name: "config",
      title: "Configuration",
      type: "array",
      of: [{ type: "string" }],
      initialValue: ["full-width"],
      options: {
        list: [{ title: "Full width", value: "full-width" }],
      },
    },
  ],
  preview: {
    select: {
      images: "images",
      media: "images.0",
    },
    prepare({ images, media }) {
      return {
        title: `${Object.keys(images).length} Images`,
        subtitle: "Image collection",
        media,
      };
    },
  },
};
