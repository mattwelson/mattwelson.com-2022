import * as React from "react"
import urlBuilder from "@sanity/image-url/"
import { getImageDimensions } from "@sanity/asset-utils"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import client from "./sanityClient"

const MetaImage = ({
  value,
}: {
  value: SanityImageSource & { caption?: string }
}) => {
  const { width, height } = getImageDimensions(value)
  return (
    <>
      <img
        src={urlBuilder(client)
          .image(value)
          .width(1000)
          .fit("max")
          .auto("format")
          .url()}
        alt={value.caption || ""}
        loading='lazy'
        // tell Sanity how large to make the image (does not set any CSS)
        className={`-mx-8 my-4 w-[calc(100%+4rem)] max-w-none object-cover aspect-[${width}/${height}]`}
      />
      {value.caption && (
        <caption className='mb-4 text-slate-600'>{value.caption}</caption>
      )}
    </>
  )
}

export default MetaImage
