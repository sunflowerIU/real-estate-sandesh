import type { Metadata, Viewport } from "next";
import { DM_Sans, Lora, Noto_Sans_Devanagari, Noto_Serif_Devanagari } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { EntryDoor } from "@/components/motion/entry-door";
import { siteConfig } from "@/config/site";
import "./globals.css";

const sans = DM_Sans({ variable: "--font-sans-custom", subsets: ["latin"], display: "swap" });
const serif = Lora({ variable: "--font-serif-custom", subsets: ["latin"], display: "swap", style: ["normal", "italic"] });
const nepaliSans = Noto_Sans_Devanagari({ variable: "--font-nepali-sans", subsets: ["devanagari"], display: "swap" });
const nepaliSerif = Noto_Serif_Devanagari({ variable: "--font-nepali-serif", subsets: ["devanagari"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "GharJagga Nepal | Houses & Land for Sale", template: "%s | GharJagga Nepal" },
  description: siteConfig.description,
  keywords: ["real estate Nepal", "house for sale Kathmandu", "land for sale Nepal", "ghar jagga", "property Nepal", "aana land", "kattha land"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_NP", siteName: siteConfig.name, title: "GharJagga Nepal | Find a place meant for you", description: siteConfig.description, url: "/" },
  twitter: { card: "summary_large_image", title: "GharJagga Nepal | Houses & Land for Sale", description: siteConfig.description },
  category: "real estate",
};

export const viewport: Viewport = { themeColor: "#153b2f", colorScheme: "light" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ne-NP" suppressHydrationWarning className={`${sans.variable} ${serif.variable} ${nepaliSans.variable} ${nepaliSerif.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("gharjagga-entry-door-seen-v4")==="true"||matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("entry-door-seen")}}catch(e){}`,
          }}
        />
      </head>
      <body>
        <EntryDoor />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
