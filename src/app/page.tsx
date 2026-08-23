import { PropertyExplorer } from "@/components/properties/property-explorer";
import { Hero } from "@/components/sections/hero";
import { SellSection } from "@/components/sections/sell-section";
import { TrustStrip } from "@/components/sections/trust-strip";
import { UnitGuide } from "@/components/sections/unit-guide";
import { getDistricts, getProperties } from "@/lib/properties";

export default function HomePage() {
  const properties = getProperties();
  const districts = getDistricts();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "GharJagga Nepal",
    areaServed: { "@type": "Country", name: "Nepal" },
    description: "Verified houses and land for sale across Nepal.",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Hero />
      <TrustStrip />
      <PropertyExplorer properties={properties} districts={districts} />
      <UnitGuide />
      <SellSection />
    </>
  );
}
