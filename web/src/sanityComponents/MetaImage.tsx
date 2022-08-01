import * as React from "react";
import urlBuilder from "@sanity/image-url/";
import { getImageDimensions } from "@sanity/asset-utils";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import client from "./sanityClient";

const MetaImage = ({
  value,
}: {
  value: SanityImageSource & { caption?: string };
}) => {
  const { width, height } = getImageDimensions(value as SanityImageSource);
  return (
    <figure className="-mx-8 my-4 w-[calc(100%+4rem)] ">
      <img
        src={urlBuilder(client)
          .image(value)
          .width(1000)
          .fit("max")
          .auto("format")
          .url()}
        alt={value.caption || ""}
        loading="lazy"
        // tell Sanity how large to make the image (does not set any CSS)
        className={` object-cover aspect-[${width}/${height}]`}
      />
      {value.caption && (
        <figcaption className="mt-2 mb-4 text-center text-slate-600">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
};

export default MetaImage;
