import {
  PortableText as PortableTextComponent,
  PortableTextReactComponents,
} from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";
import { SpotifyEmbed } from "./SpotifyEmbed";
import getYouTubeID from "get-youtube-id";
import YouTube from "react-youtube";

// TODO: add other types, add marks
const components: Partial<PortableTextReactComponents> = {
  types: {
    youtube: ({ value: { url } }: { value: { url: string } }) => {
      const id = getYouTubeID(url);
      if (!id) return url;
      console.log({ url, id, YouTube });
      return (
        <iframe
          width="420"
          height="315"
          src={`https://www.youtube.com/embed/${id}`}
        />
      );
    },
    spotify: ({ value: { url } }: { value: { url: string } }) => {
      return <SpotifyEmbed url={url} />;
    },
  },
};

export function PortableText({ value }: { value: PortableTextBlock[] }) {
  return <PortableTextComponent components={components} value={value} />;
}
