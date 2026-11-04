import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zencca — Salon de thé, Paris 2e",
    short_name: "Zencca",
    start_url: "/",
    display: "browser",
    background_color: "#f8ebd3",
    theme_color: "#f8ebd3",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
