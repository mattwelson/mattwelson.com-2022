interface ColourOptions {
    palette: "vibrant" | "darkVibrant" | "muted" | "darkMuted";
    option: "foreground" | "background"
}

export default function getColourValue(image: Queries.SanityImage, { palette = "vibrant", option = "background" }: ColourOptions): string {
    const p = image.metaAsset?.metadata?.palette
    if (!p || !p[palette] || !p[palette][option]) return "#000"
    return p[palette][option] ?? "#000"
}