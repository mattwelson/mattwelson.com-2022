import { FaRegImage as icon } from 'react-icons/fa'

export default {
  name: "metaimage",
  title: "Image",
  type: "image",
  icon,
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
