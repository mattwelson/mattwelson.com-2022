import * as React from "react";
import urlBuilder from "@sanity/image-url/";
import { getImageDimensions } from "@sanity/asset-utils";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import client from "./sanityClient";

type CaptionSanityImageSource = SanityImageSource & {
  caption?: string;
  _key: String;
};

// TODO: show caption on hover or something?
const ImageCollectionImage = ({
  image,
}: {
  image: CaptionSanityImageSource;
}) => {
  const { aspectRatio } = getImageDimensions(image);
  return (
    <figure
      className="group grid grid-rows-[1fr_auto]"
      style={{ flex: aspectRatio }}
    >
      <img
        src={urlBuilder(client)
          .image(image)
          .width(1000)
          .fit("max")
          .auto("format")
          .url()}
        alt={image.caption || ""}
        loading="lazy"
        className={`object-cover md:min-h-full`}
      />
      {image.caption && (
        <figcaption className="mt-2 mb-4 w-full text-center text-slate-600 duration-200 ease-in-out group-hover:opacity-100 md:opacity-0  ">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
};

const ImageCollection = ({
  value: { images, config },
}: {
  value: {
    images: Array<CaptionSanityImageSource & { _key: String }>;
    config: Array<string>;
  };
}) => {
  const isFullWidth = config.includes("full-width");
  const fullBleedClasses =
    "full-bleed max-w-[2000px] mx-auto md:px-2 md:flex-row flex-col my-4";
  const bigClasses = "-mx-8 my-4 w-[calc(100%+4rem)] max-w-none";
  return (
    <div
      className={`${isFullWidth ? fullBleedClasses : bigClasses} flex gap-1`}
    >
      {images.map((image) => (
        <ImageCollectionImage image={image} key={image._key} />
      ))}
    </div>
  );
};

export default ImageCollection;
