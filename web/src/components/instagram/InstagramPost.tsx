import * as React from "react";
import urlBuilder from "@sanity/image-url/";
import { getImageDimensions } from "@sanity/asset-utils";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { FaInstagram } from "react-icons/fa";
import client from "../../sanityComponents/sanityClient";
import getColourValue from "./utils";

const InstagramPostInline = ({
  post: { image, url },
  isFirst = false,
}: {
  post: Queries.InstagramListableFragment;
  isFirst?: Boolean;
}) => {
  if (!url || !image) {
    console.error(`No URL defined for instagrampost`);
    return null;
  }
  const { width } = getImageDimensions(image as SanityImageSource);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener nofollow noindex"
      className={`origin-bottom-right overflow-hidden font-semibold text-blue-700 underline opacity-95 duration-200 ease-in-out  hover:opacity-100 sm:rounded-md ${
        isFirst
          ? `md:scale-125 md:shadow-md hover:md:shadow-lg`
          : `md:shadow-sm hover:md:shadow-md`
      }`}
    >
      <figure className="relative ">
        <FaInstagram className="absolute right-4 top-4 text-xl text-white" />
        <img
          src={urlBuilder(client)
            .image(image)
            .width(width)
            .fit("max")
            .auto("format")
            .url()}
          alt={image?.caption || ""}
          loading="lazy"
          // tell Sanity how large to make the image (does not set any CSS)
          className={`aspect-square object-cover`}
        />
      </figure>
    </a>
  );
};

export default InstagramPostInline;
