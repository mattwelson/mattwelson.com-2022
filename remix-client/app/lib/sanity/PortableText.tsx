import {
  PortableText as PortableTextComponent,
  PortableTextReactComponents,
} from "@portabletext/react";

// TODO: add other types, add marks
const components: Partial<PortableTextReactComponents> = {
  types: {
    youtube: ({ value: { url } }: { value: { url: string } }) => {
      return <div>{url}</div>;
    },
  },
};

export function PortableText(props) {
  return <PortableTextComponent components={components} {...props} />;
}
