import { imageBuilder } from "~/model/sanity";

// TODO: fix aspect ratio, make it based off of crop, so it's different for each image
export function Image({
  image,
  className = "",
  caption = true,
  halfWidth = false,
}: {
  image?: any;
  className?: string;
  caption?: boolean;
  halfWidth?: boolean;
  includeLayoutId?: boolean;
}) {
  if (!image) return null;
  const aspectRatio = 12 / 7;
  const imageUrlBase = (width: number) =>
    imageBuilder
      .image(image)
      .fit("clip")
      .quality(95)
      .width(width)
      .height(Math.round(width / aspectRatio))
      .url();
  return (
    <>
      <img
        src={imageUrlBase(1200)}
        srcSet={[300, 400, 600, 700, 900, 1100, 1200, 2400]
          .map((w) => `${imageUrlBase(w)} ${w}w`)
          .join(",\n")}
        sizes={halfWidth ? "(min-width: 768px) 50vw, 100vw" : "100vw"}
        alt={image.caption ?? ""}
        className={`aspect-[12/7] w-[1200px] ${className}`}
      />
      {caption && <figcaption>{image.attribution ?? image.caption}</figcaption>}
    </>
  );
}
