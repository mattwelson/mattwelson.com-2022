import {
  PortableText as PortableTextComponent,
  PortableTextReactComponents,
} from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";

// TODO: add other types, add marks
const components: Partial<PortableTextReactComponents> = {
  types: {
    youtube: ({ value: { url } }: { value: { url: string } }) => {
      return <div>{url}</div>;
    },
  },
};

export function PortableText({ value }: { value: PortableTextBlock[] }) {
  return <PortableTextComponent components={components} value={value} />;
}
