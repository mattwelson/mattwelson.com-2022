import {
  PortableText as PortableTextComponent,
  PortableTextReactComponents,
} from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";
import { SpotifyEmbed } from "./SpotifyEmbed";
import getYouTubeID from "get-youtube-id";
import InstagramPostInline from "./InstagramPostInline";
import LinkableHeader from "./LinkableHeader";
import { Image } from "../image";

// TODO: add other types, add marks
const components: Partial<PortableTextReactComponents> = {
  types: {
    youtube: ({ value: { url } }: { value: { url: string } }) => {
      const id = getYouTubeID(url);
      if (!id) return url;
      return (
        <iframe
          width="600"
          height="400"
          src={`https://www.youtube.com/embed/${id}`}
        />
      );
    },
    spotify: ({ value: { url } }: { value: { url: string } }) => {
      return <SpotifyEmbed url={url} />;
    },
    instagrampost: ({ value }) => {
      return <InstagramPostInline node={value} />;
    },
    metaimage: ({ value }) => {
      return <Image image={value.asset} caption={value.caption} />;
    },
  },
  block: {
    h1: LinkableHeader("h1", "mb-2 mt-4 font-serif text-4xl font-bold"),
    h2: LinkableHeader("h2", "mb-2 mt-4 font-serif text-3xl font-bold"),
    h3: LinkableHeader("h3", "mb-2 mt-4 font-serif text-2xl font-bold"),
    h4: LinkableHeader("h4", "mb-2 mt-4 font-serif text-xl font-bold"),
    normal: (params) => {
      return <p className="mb-4">{params.children}</p>;
    }, //({ children }) => <p className="mb-4"> {children} </p>,
    blockquote: ({ children }) => (
      <blockquote className="mb-4 border-l-4 border-slate-400 bg-slate-200 px-4 py-2">
        {children}
      </blockquote>
    ),
  },
};

export function PortableText({ value }: { value: PortableTextBlock[] }) {
  return <PortableTextComponent components={components} value={value} />;
}
