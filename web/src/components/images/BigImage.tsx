import * as React from "react";
import SanityImage from "gatsby-plugin-sanity-image";

const BigImage = ({
  image,
  showCaption = true,
}: {
  image: Queries.ImageWithPreviewFragment & { caption: string };
  showCaption?: Boolean;
}) => (
  <figure className="-mx-8 my-4 w-[calc(100%+4rem)]">
    <SanityImage
      alt={image.caption}
      {...image}
      // tell Sanity how large to make the image (does not set any CSS)
      className="w-full object-cover"
    />
    {image.caption && showCaption && (
      <figcaption className="mt-2 mb-4 text-center text-slate-600">
        {image.caption}
      </figcaption>
    )}
  </figure>
);

export default BigImage;
