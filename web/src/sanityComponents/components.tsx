import * as React from "react";
import {
  PortableTextReactComponents,
  SerializedBlock,
} from "@portabletext/react";
import ImageCollection from "./ImageCollection";
import LinkableHeader from "./LinkableHeader";
import LinkInline from "./LinkInline";
import MetaImage from "./MetaImage";
import InstagramPostInline from "./InstagramPostInline";

const components: Partial<PortableTextReactComponents> = {
  types: {
    metaimage: MetaImage,
    imagecollection: ImageCollection,
    instagrampost: (params: any) => {
      console.log({ params });
      return <div>instagrampost </div>;
    },
    reference: (params: any) => {
      console.log({ params });
      return <div>reference </div>;
    },
  },
  block: {
    h1: LinkableHeader("h1", "mb-2 font-serif text-4xl"),
    h2: LinkableHeader("h2", "mb-2 font-serif text-3xl"),
    h3: LinkableHeader("h3", "mb-2 font-serif text-2xl"),
    h4: LinkableHeader("h4", "mb-2 font-serif text-xl"),
    normal: (params) => {
      const {
        value: { _type: type },
      } = params;
      if (type === "instagrampost")
        return (
          <InstagramPostInline
            node={params.value as unknown as Queries.SanityInstagrampost}
          />
        );
      return <p className="mb-4"> {params.children} </p>;
    }, //({ children }) => <p className="mb-4"> {children} </p>,
    blockquote: ({ children }) => (
      <blockquote className="mb-4 border-l-4 border-slate-400 bg-slate-200 py-2 px-4">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: LinkInline,
  },
};

export default components;
