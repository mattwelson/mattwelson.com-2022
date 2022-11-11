import { Link } from "@remix-run/react";
import React from "react";
import { getInstagramPosts } from "~/model/post.server";
import Image from "../images";

export function Layout({
  children,
  instagramPosts,
}: {
  children: React.ReactNode;
  instagramPosts: Awaited<ReturnType<typeof getInstagramPosts>>;
}) {
  return (
    <div className="">
      <div className="text-lg">
        <Link to="/" prefetch="intent">
          Matt Welson
        </Link>
      </div>
      {children}
      <div className="">
        {instagramPosts?.map((i) => (
          <div key={i._id}>
            <a href={i.url} target="_blank" rel="nofollow noreferrer">
              <Image src={i.image} />
              {i.image.caption}
            </a>
          </div>
        ))}
      </div>
      <div>Footer</div>
    </div>
  );
}
