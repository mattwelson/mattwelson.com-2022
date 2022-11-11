import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { config } from "~/lib/sanity";

export const urlFor = (source: SanityImageSource) =>
  imageUrlBuilder(config).image(source);

// TODO: add size options and style options
export default function Image({ src }: { src: SanityImageSource }) {
  return <img loading="lazy" src={urlFor(src).url()} />;
}
