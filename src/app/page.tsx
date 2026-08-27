import { Suspense } from "react";
import { PropertyExplorer } from "@/components/properties/property-explorer";
import { Hero } from "@/components/sections/hero";
import { SellSection } from "@/components/sections/sell-section";
import { TrustStrip } from "@/components/sections/trust-strip";
import { UnitGuide } from "@/components/sections/unit-guide";
import { getLocalities, getProperties } from "@/lib/properties";

export default function HomePage() {
  const properties = getProperties();
  const localities = getLocalities();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "GharJagga Kathmandu",
    areaServed: {
      "@type": "City",
      name: "Kathmandu",
      containedInPlace: { "@type": "Country", name: "Nepal" },
    },
    description: "Verified houses and land for sale across Kathmandu.",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Hero />
      <TrustStrip />
      <Suspense fallback={<div className="property-loading" id="properties">सम्पत्ति लोड हुँदैछ…</div>}>
        <PropertyExplorer properties={properties} localities={localities} />
      </Suspense>
      <UnitGuide />
      <SellSection />
    </>
  );
}
