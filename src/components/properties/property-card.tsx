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

const districtLabels: Record<string, string> = {
  Kathmandu: "काठमाडौं",
  Lalitpur: "ललितपुर",
  Chitwan: "चितवन",
  Sunsari: "सुनसरी",
  Kaski: "कास्की",
  Morang: "मोरङ",
};

function toNepaliDigits(value: string | number) {
  return String(value).replace(/[0-9]/g, (digit) => "०१२३४५६७८९"[Number(digit)]);
}

function localizeArea(value: string) {
  return toNepaliDigits(value)
    .replace(/ropani/gi, "रोपनी")
    .replace(/aana/gi, "आना")
    .replace(/paisa/gi, "पैसा")
    .replace(/daam/gi, "दाम")
    .replace(/bigha/gi, "बिघा")
    .replace(/kattha/gi, "कट्ठा")
    .replace(/dhur/gi, "धुर");
}

function PropertyCardComponent({ property }: PropertyCardProps) {
  return (
    <article className="property-card">
      <Link className="property-card-link" href={`/properties/${property.slug}`} aria-label={`${property.title} हेर्नुहोस्`}>
        <div className="property-media">
          <Image
            src={property.image}
            alt={property.title}
            fill
            sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
          />
          <div className="property-badges">
            <Badge className="listing-badge">{property.type === "house" ? "घर" : "जग्गा"}</Badge>
            {property.verified && <Badge className="verified-badge"><BadgeCheck /> प्रमाणित</Badge>}
          </div>
          <span className="card-arrow"><ArrowUpRight aria-hidden="true" /></span>
        </div>
        <div className="property-body">
          <div className="property-location"><MapPin aria-hidden="true" /> {property.location.locality}, {districtLabels[property.location.district] ?? property.location.district}</div>
          <h3>{property.title}</h3>
          <p>{property.excerpt}</p>
          <div className="property-specs">
            <span><Ruler aria-hidden="true" /> {localizeArea(property.area.display)}</span>
            {property.bedrooms && <span><BedDouble aria-hidden="true" /> {toNepaliDigits(property.bedrooms)} बेडरुम</span>}
            {property.bathrooms && <span><Bath aria-hidden="true" /> {toNepaliDigits(property.bathrooms)} बाथरुम</span>}
            {property.parking && <span><CarFront aria-hidden="true" /> {toNepaliDigits(property.parking)} पार्किङ</span>}
          </div>
          <div className="property-price-row">
            <div><strong>{toNepaliDigits(property.priceLabel.replace("Rs.", "रु."))}</strong>{property.negotiable && <small>मूल्यमा छलफल गर्न सकिने</small>}</div>
            <span>{toNepaliDigits(property.roadAccessFt)} फिट बाटो</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export const PropertyCard = memo(PropertyCardComponent);
