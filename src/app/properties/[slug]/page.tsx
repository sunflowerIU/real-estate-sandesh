import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyDetail } from "@/components/properties/property-detail";
import { getProperties, getPropertyBySlug } from "@/lib/properties";

export function generateStaticParams() {
  return getProperties().map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/properties/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return {};
  return {
    title: property.title,
    description: property.excerpt,
    alternates: { canonical: `/properties/${property.slug}` },
    openGraph: {
      title: property.title,
      description: property.excerpt,
      type: "article",
      images: [{ url: property.image, alt: property.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: property.title,
      description: property.excerpt,
      images: [property.image],
    },
  };
}

export default async function PropertyPage({
  params,
}: PageProps<"/properties/[slug]">) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();
  const listingData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `/properties/${property.slug}`,
    image: property.image,
    datePosted: property.postedAt,
    offers: {
      "@type": "Offer",
      price: property.priceNpr,
      priceCurrency: "NPR",
    },
  };

  return (
    <article className="detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingData) }}
      />
      <PropertyDetail property={property} />
    </article>
  );
}
