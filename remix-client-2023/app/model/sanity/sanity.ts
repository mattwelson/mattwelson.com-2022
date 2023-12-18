import ImageUrlBuilder from "@sanity/image-url";

export const imageBuilder = ImageUrlBuilder({
  projectId:
    (typeof process !== "undefined"
      ? process.env.SANITY_PROJECT_ID
      : window.ENV.SANITY_PROJECT_ID) ?? "",
  dataset:
    (typeof process !== "undefined"
      ? process?.env.SANITY_DATASET
      : window.ENV.SANITY_DATASET) ?? "",
});
