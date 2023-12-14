import ImageUrlBuilder from "@sanity/image-url";

export const imageBuilder = ImageUrlBuilder({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
});
