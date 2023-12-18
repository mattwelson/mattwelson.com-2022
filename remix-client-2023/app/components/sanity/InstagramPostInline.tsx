import { SanityImageSource, getImageDimensions } from "@sanity/asset-utils";
import { FaInstagram } from "react-icons/fa";

import { imageBuilder } from "~/model/sanity";

const InstagramPostInline = ({
  node: { image, url },
}: {
  node: { image: SanityImageSource & { caption?: string }; url: string };
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
      className="font-semibold text-blue-700 underline"
    >
      <figure className="relative -mx-8 my-4 w-[calc(100%+4rem)] bg-white p-6 duration-200 ease-in-out sm:rounded-lg sm:drop-shadow-none hover:sm:-translate-y-1 hover:sm:bg-slate-100 hover:sm:drop-shadow-lg">
        <FaInstagram className="absolute right-8 top-8 text-xl text-white" />
        <img
          src={imageBuilder
            .image(image)
            .width(width)
            .fit("max")
            .auto("format")
            .url()}
          alt={image?.caption || ""}
          loading="lazy"
          // tell Sanity how large to make the image (does not set any CSS)
          className={` aspect-square rounded-md object-cover`}
        />
        {image?.caption && (
          <figcaption className="mb-4 mt-2 text-center text-slate-600">
            {image.caption}
          </figcaption>
        )}
      </figure>
    </a>
  );
};

export default InstagramPostInline;
