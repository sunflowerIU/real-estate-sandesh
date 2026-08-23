export type PropertyType = "house" | "land";
export type AreaSystem = "hill" | "terai";

export interface PropertyArea {
  system: AreaSystem;
  display: string;
  sqFt: number;
  ropani?: number;
  aana?: number;
  paisa?: number;
  daam?: number;
  bigha?: number;
  kattha?: number;
  dhur?: number;
}

export interface PropertyLocation {
  locality: string;
  municipality: string;
  district: string;
  province: string;
}

export interface Property {
  id: string;
  slug: string;
  type: PropertyType;
  title: string;
  excerpt: string;
  description: string;
  priceNpr: number;
  priceLabel: string;
  negotiable: boolean;
  location: PropertyLocation;
  area: PropertyArea;
  image: string;
  featured: boolean;
  verified: boolean;
  postedAt: string;
  roadAccessFt: number;
  roadType: "blacktopped" | "gravel" | "concrete";
  facing: "east" | "west" | "north" | "south" | "north-east" | "south-east";
  bedrooms?: number;
  bathrooms?: number;
  floors?: number;
  parking?: number;
  furnishing?: "furnished" | "semi-furnished" | "unfurnished";
  amenities: string[];
}

export interface PropertyFilters {
  query: string;
  type: "all" | PropertyType;
  district: "all" | string;
  maxPrice: number;
  areaSystem: "all" | AreaSystem;
}
