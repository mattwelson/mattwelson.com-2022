import * as React from "react";
import SanityImage from "gatsby-plugin-sanity-image";

const BigImage = ({ image }) => (
  <>
    <SanityImage
      {...image}
      // tell Sanity how large to make the image (does not set any CSS)
      className="-mx-8 my-4 w-[calc(100%+4rem)] max-w-none object-cover"
    />
    <caption className="mb-4 text-slate-600">{image.caption}</caption>
  </>
);

export default BigImage;
