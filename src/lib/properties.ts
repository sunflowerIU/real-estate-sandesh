import propertiesData from "@/data/properties.json";
import type { Property } from "@/types/property";

const properties = propertiesData as Property[];

export function getProperties(): Property[] {
  return properties;
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((property) => property.slug === slug);
}

export function getLocalities(): string[] {
  return [...new Set(properties.map((property) => property.location.locality))].sort();
}
