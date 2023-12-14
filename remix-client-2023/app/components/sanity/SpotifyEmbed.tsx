export function SpotifyEmbed({ url }: { url: string }) {
  return (
    <iframe
      className="!col-start-1 col-end-[-1] mb-4 max-w-7xl justify-self-center rounded-xl px-2 "
      src={`${url}?utm_source=generator&t=0`}
      width="100%"
      height="232"
      allowFullScreen={false}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    />
  );
}
