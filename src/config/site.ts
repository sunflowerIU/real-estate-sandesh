export const siteConfig = {
  name: "GharJagga",
  nepaliName: "घरजग्गा",
  description:
    "Verified houses and land for sale across Nepal, with local area units and human guidance.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gharjagga.example.com",
  salesEmail:
    process.env.NEXT_PUBLIC_SALES_EMAIL ?? "property@gharjagga.example.com",
  phone: "+977 980-000-0000",
  nav: [
    { label: "Buy", href: "/#properties" },
    { label: "Houses", href: "/?type=house#property-filters" },
    { label: "Land", href: "/?type=land#property-filters" },
    { label: "Sell", href: "/#sell" },
  ],
} as const;
