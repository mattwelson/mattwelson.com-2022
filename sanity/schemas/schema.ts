import category from "./category"
import imagecollection from "./imagecollection"
import instagramPost from "./instagrampost"
import metaimage from "./metaimage"
import post from "./post"
import spotify from "./embeds/spotify"
import youtube from "./embeds/youtube"

// Then we give our schema to the builder and provide the result to Sanity
export const schemaTypes = [category,
    imagecollection,
    instagramPost,
    metaimage,
    post,
    spotify,
    youtube]
