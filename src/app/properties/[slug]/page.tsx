import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Check,
  Compass,
  MapPin,
  Ruler,
  ShieldCheck,
  Waypoints,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PropertyMediaCarousel } from "@/components/properties/property-media-carousel";
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
      <div className="site-shell detail-shell">
        <Link className="detail-back" href="/#properties">
          <ArrowLeft /> Back to properties
        </Link>
        <div className="detail-hero">
          <PropertyMediaCarousel
            title={property.title}
            media={
              property.media?.length
                ? property.media
                : [{ type: "image", src: property.image, alt: property.title }]
            }
          />
          <aside className="detail-summary">
            <div className="detail-badges">
              <Badge>{property.type}</Badge>
              {property.verified && (
                <Badge variant="secondary">
                  <ShieldCheck /> Verified
                </Badge>
              )}
            </div>
            <p className="property-location">
              <MapPin /> {property.location.locality},{" "}
              {property.location.district}
            </p>
            <h1>{property.title}</h1>
            <p className="detail-price">{property.priceLabel}</p>
            {property.negotiable && (
              <span className="negotiable">Price negotiable</span>
            )}
            <dl className="detail-facts">
              <div>
                <dt>
                  <Ruler /> Land area
                </dt>
                <dd>{property.area.display}</dd>
              </div>
              <div>
                <dt>
                  <Waypoints /> Road access
                </dt>
                <dd>
                  {property.roadAccessFt} ft · {property.roadType}
                </dd>
              </div>
              <div>
                <dt>
                  <Compass /> Facing
                </dt>
                <dd>{property.facing}</dd>
              </div>
              {property.bedrooms && (
                <div>
                  <dt>
                    <BedDouble /> Bedrooms
                  </dt>
                  <dd>{property.bedrooms}</dd>
                </div>
              )}
              {property.bathrooms && (
                <div>
                  <dt>
                    <Bath /> Bathrooms
                  </dt>
                  <dd>{property.bathrooms}</dd>
                </div>
              )}
            </dl>
            <Link className="button button-primary detail-cta" href="/#sell">
              यस सम्पत्तिबारे बुझ्नुहोस् <span>/ Enquiry</span>
            </Link>
          </aside>
        </div>
        <div className="detail-content">
          <section>
            <p className="eyebrow">Property overview</p>
            <h2>A closer look</h2>
            <p>{property.description}</p>
          </section>
          <section>
            <p className="eyebrow">Included details</p>
            <h2>Highlights</h2>
            <ul>
              {property.amenities.map((item) => (
                <li key={item}>
                  <Check /> {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
}
