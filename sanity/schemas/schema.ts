// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator"

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type"

import category from "./category"
import imagecollection from "./imagecollection"
import instagramPost from "./instagrampost"
import metaimage from "./metaimage"
import post from "./post"
import spotify from "./embeds/spotify"
import youtube from "./embeds/youtube"

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([category,
    imagecollection,
    instagramPost,
    metaimage,
    post,
    spotify,
    youtube]),
})
