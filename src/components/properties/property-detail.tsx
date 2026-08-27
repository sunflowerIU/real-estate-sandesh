"use client";

import Link from "next/link";
import { ArrowLeft, Bath, BedDouble, Check, Compass, MapPin, Ruler, ShieldCheck, Waypoints } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PropertyMediaCarousel } from "@/components/properties/property-media-carousel";
import { useLanguage, useSiteCopy } from "@/components/providers/language-provider";
import { SellPropertyDialogTrigger } from "@/components/sell/sell-property-dialog";
import { formatLocalizedNumber, formatPropertyPrice } from "@/lib/format";
import { getLocalizedProperty, localizeArea, localizePlace, localizeTerm } from "@/lib/property-localization";
import type { Property } from "@/types/property";

export function PropertyDetail({ property }: { property: Property }) {
  const { language } = useLanguage();
  const copy = useSiteCopy().detail;
  const localized = getLocalizedProperty(property, language);
  const media = property.media?.length
    ? property.media
    : [{ type: "image" as const, src: property.image, alt: localized.title }];

  return (
    <div className="site-shell detail-shell">
      <Link className="detail-back" href="/#properties"><ArrowLeft /> {copy.back}</Link>
      <div className="detail-hero">
        <PropertyMediaCarousel title={localized.title} media={media} copy={{ gallery: copy.gallery, swipe: copy.swipe, previous: copy.previous, next: copy.next, choose: copy.choose, show: copy.show }} />
        <aside className="detail-summary">
          <div className="detail-badges">
            <Badge>{property.type === "house" ? copy.house : copy.land}</Badge>
            {property.verified && <Badge variant="secondary"><ShieldCheck /> {copy.verified}</Badge>}
          </div>
          <p className="property-location"><MapPin /> {localizePlace(property.location.locality, language)}, {localizePlace(property.location.district, language)}</p>
          <h1>{localized.title}</h1>
          <p className="detail-price">{formatPropertyPrice(property.priceNpr, language)}</p>
          {property.negotiable && <span className="negotiable">{copy.negotiable}</span>}
          <dl className="detail-facts">
            <div><dt><Ruler /> {copy.area}</dt><dd>{localizeArea(property.area.display, language)}</dd></div>
            <div><dt><Waypoints /> {copy.road}</dt><dd>{formatLocalizedNumber(property.roadAccessFt, language)} {language === "ne" ? "फिट" : "ft"} · {localizeTerm(property.roadType, language)}</dd></div>
            <div><dt><Compass /> {copy.facing}</dt><dd>{localizeTerm(property.facing, language)}</dd></div>
            {property.bedrooms && <div><dt><BedDouble /> {copy.bedrooms}</dt><dd>{formatLocalizedNumber(property.bedrooms, language)}</dd></div>}
            {property.bathrooms && <div><dt><Bath /> {copy.bathrooms}</dt><dd>{formatLocalizedNumber(property.bathrooms, language)}</dd></div>}
          </dl>
          <SellPropertyDialogTrigger className="button button-primary detail-cta">{copy.enquire}</SellPropertyDialogTrigger>
        </aside>
      </div>
      <div className="detail-content">
        <section><p className="eyebrow">{copy.overview}</p><h2>{copy.closer}</h2><p>{localized.description}</p></section>
        <section><p className="eyebrow">{copy.included}</p><h2>{copy.highlights}</h2><ul>{localized.amenities.map((item) => <li key={item}><Check /> {item}</li>)}</ul></section>
      </div>
    </div>
  );
}
