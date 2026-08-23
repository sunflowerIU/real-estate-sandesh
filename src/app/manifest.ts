import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest { return { name: "GharJagga Nepal", short_name: "GharJagga", description: "Verified houses and land for sale across Nepal.", start_url: "/", display: "standalone", background_color: "#f4f1e8", theme_color: "#153b2f" }; }
