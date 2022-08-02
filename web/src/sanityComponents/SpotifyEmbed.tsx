import * as React from "react";

const SpotifyEmbed = ({ value: { url } }: { value: Queries.SanitySpotify }) => {
  return (
    <iframe
      className="mb-4 rounded-xl"
      src={`${url}?utm_source=generator&t=0`}
      width="100%"
      height="232"
      frameBorder="0"
      allowFullScreen={false}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    />
  );
};

export default SpotifyEmbed;
