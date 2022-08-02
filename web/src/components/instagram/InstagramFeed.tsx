import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";
import InstagramPost from "./InstagramPost";
import getColourValue from "./utils";

const InstagramFeed = () => {
  const {
    feed: { posts },
  } = useStaticQuery<Queries.InstagramFeedQuery>(graphql`
    fragment InstagramListable on SanityInstagrampost {
      url
      image {
        _type
        caption
        metaAsset: asset {
          metadata {
            palette {
              vibrant {
                foreground
                background
              }
              darkVibrant {
                foreground
                background
              }
              muted {
                foreground
                background
              }
              darkMuted {
                foreground
                background
              }
            }
          }
        }
        ...ImageWithPreview
      }
    }
    query InstagramFeed {
      feed: allSanityInstagrampost(
        sort: { order: DESC, fields: _createdAt }
        limit: 6
      ) {
        posts: nodes {
          ...InstagramListable
        }
      }
    }
  `);

  const color = getColourValue(posts[0]?.image, {
    palette: "vibrant",
    option: "background",
  });

  return (
    <div className=" grid-content bg-slate-100 pt-8 pb-16">
      <div className="grid grid-cols-2 sm:gap-2 md:grid-cols-3 md:gap-4">
        <h2
          className="col-start-1 col-end-[-1] font-serif text-lg font-bold text-slate-600 md:col-start-2"
          style={{ color }}
        >
          From Instagram
        </h2>
        {posts.map((p, i) => (
          <InstagramPost post={p} isFirst={i === 0} key={p.url} />
        ))}
      </div>
    </div>
  );
};

export default InstagramFeed;
