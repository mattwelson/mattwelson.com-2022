import * as React from "react";
import {
  PortableTextReactComponents,
  SerializedBlock,
} from "@portabletext/react";
import getYouTubeId from "get-youtube-id";
import YouTube from "react-youtube";
import ImageCollection from "./ImageCollection";
import LinkableHeader from "./LinkableHeader";
import LinkInline from "./LinkInline";
import MetaImage from "./MetaImage";
import InstagramPostInline from "./InstagramPostInline";
import SpotifyEmbed from "./SpotifyEmbed";

const components: Partial<PortableTextReactComponents> = {
  types: {
    metaimage: MetaImage,
    imagecollection: ImageCollection,
    spotify: SpotifyEmbed,
    youtube: ({ value: { url } }: { value: Queries.SanityYoutube }) => {
      const id = getYouTubeId(url);
      return <YouTube videoId={id}
        className="relative mb-4 h-0 w-full overflow-hidden pb-[56.25%]"
        iframeClassName="absolute w-full h-full top-0 left-0"
      />;
    },
  },
  block: {
    h1: LinkableHeader("h1", "mb-2 font-serif text-4xl font-bold"),
    h2: LinkableHeader("h2", "mb-2 font-serif text-3xl font-bold"),
    h3: LinkableHeader("h3", "mb-2 font-serif text-2xl font-bold"),
    h4: LinkableHeader("h4", "mb-2 font-serif text-xl font-bold"),
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
