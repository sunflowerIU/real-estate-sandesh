"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Bath, BedDouble, BadgeCheck, CarFront, MapPin, Ruler } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
}

function PropertyCardComponent({ property }: PropertyCardProps) {
  return (
    <article className="property-card">
      <Link className="property-media" href={`/properties/${property.slug}`} aria-label={`View ${property.title}`}>
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
        />
        <div className="property-badges">
          <Badge className="listing-badge">{property.type === "house" ? "House" : "Land"}</Badge>
          {property.verified && <Badge className="verified-badge"><BadgeCheck /> Verified</Badge>}
        </div>
        <span className="card-arrow"><ArrowUpRight aria-hidden="true" /></span>
      </Link>
      <div className="property-body">
        <div className="property-location"><MapPin aria-hidden="true" /> {property.location.locality}, {property.location.district}</div>
        <Link href={`/properties/${property.slug}`}><h3>{property.title}</h3></Link>
        <p>{property.excerpt}</p>
        <div className="property-specs">
          <span><Ruler aria-hidden="true" /> {property.area.display}</span>
          {property.bedrooms && <span><BedDouble aria-hidden="true" /> {property.bedrooms} beds</span>}
          {property.bathrooms && <span><Bath aria-hidden="true" /> {property.bathrooms} baths</span>}
          {property.parking && <span><CarFront aria-hidden="true" /> {property.parking} parking</span>}
        </div>
        <div className="property-price-row">
          <div><strong>{property.priceLabel}</strong>{property.negotiable && <small>Negotiable</small>}</div>
          <span>{property.roadAccessFt} ft road</span>
        </div>
      </div>
    </article>
  );
}

export const PropertyCard = memo(PropertyCardComponent);
