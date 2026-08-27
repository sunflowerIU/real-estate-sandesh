const FALLBACK_SITE_URL = "https://gharjagga.example.com";

function resolveSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim() ||
    FALLBACK_SITE_URL;

  const urlWithProtocol = /^https?:\/\//i.test(configuredUrl)
    ? configuredUrl
    : `https://${configuredUrl}`;

  try {
    return new URL(urlWithProtocol).origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export const siteConfig = {
  name: "GharJagga",
  nepaliName: "घरजग्गा",
  description:
    "Verified houses and land for sale across Kathmandu, with local area units and human guidance.",
  url: resolveSiteUrl(),
  salesEmail:
    process.env.NEXT_PUBLIC_SALES_EMAIL ?? "property@gharjagga.example.com",
  phone: "+977 980-000-0000",
  nav: [
    { key: "buy", href: "/#properties" },
    { key: "houses", href: "/?type=house#property-filters" },
    { key: "land", href: "/?type=land#property-filters" },
    { key: "sell", href: "/#sell" },
  ],
} as const;
