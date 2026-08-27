"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Bath, BedDouble, BadgeCheck, CarFront, MapPin, Ruler } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage, useSiteCopy } from "@/components/providers/language-provider";
import { formatLocalizedNumber, formatPropertyPrice } from "@/lib/format";
import { getLocalizedProperty, localizeArea, localizePlace } from "@/lib/property-localization";
import type { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
}

function PropertyCardComponent({ property }: PropertyCardProps) {
  const { language } = useLanguage();
  const copy = useSiteCopy().card;
  const typeCopy = useSiteCopy().explorer;
  const localized = getLocalizedProperty(property, language);
  return (
    <article className="property-card">
      <Link className="property-card-link" href={`/properties/${property.slug}`} aria-label={`${localized.title} ${copy.view}`}>
        <div className="property-media">
          <Image
            src={property.image}
            alt={localized.title}
            fill
            sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
          />
          <div className="property-badges">
            <Badge className="listing-badge">{property.type === "house" ? typeCopy.house : typeCopy.land}</Badge>
            {property.verified && <Badge className="verified-badge"><BadgeCheck /> {copy.verified}</Badge>}
          </div>
          <span className="card-arrow"><ArrowUpRight aria-hidden="true" /></span>
        </div>
        <div className="property-body">
          <div className="property-location"><MapPin aria-hidden="true" /> {localizePlace(property.location.locality, language)}, {localizePlace(property.location.district, language)}</div>
          <h3>{localized.title}</h3>
          <p>{localized.excerpt}</p>
          <div className="property-specs">
            <span><Ruler aria-hidden="true" /> {localizeArea(property.area.display, language)}</span>
            {property.bedrooms && <span><BedDouble aria-hidden="true" /> {formatLocalizedNumber(property.bedrooms, language)} {copy.bedrooms}</span>}
            {property.bathrooms && <span><Bath aria-hidden="true" /> {formatLocalizedNumber(property.bathrooms, language)} {copy.bathrooms}</span>}
            {property.parking && <span><CarFront aria-hidden="true" /> {formatLocalizedNumber(property.parking, language)} {copy.parking}</span>}
          </div>
          <div className="property-price-row">
            <div><strong>{formatPropertyPrice(property.priceNpr, language)}</strong>{property.negotiable && <small>{copy.negotiable}</small>}</div>
            <span>{formatLocalizedNumber(property.roadAccessFt, language)} {copy.road}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export const PropertyCard = memo(PropertyCardComponent);
