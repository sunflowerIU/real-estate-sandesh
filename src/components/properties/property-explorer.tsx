"use client";

import { useCallback, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ListFilter, Search, SlidersHorizontal, X } from "lucide-react";
import { PropertyCard } from "@/components/properties/property-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AreaSystem, Property, PropertyType } from "@/types/property";

const PAGE_SIZE = 6;
const priceOptions = [
  { value: "1000000000", label: "Any price" },
  { value: "10000000", label: "Up to 1 Cr" },
  { value: "25000000", label: "Up to 2.5 Cr" },
  { value: "50000000", label: "Up to 5 Cr" },
  { value: "75000000", label: "Up to 7.5 Cr" },
];

export function PropertyExplorer({ properties, districts }: { properties: Property[]; districts: string[] }) {
  const [type, setType] = useState<"all" | PropertyType>("all");
  const [district, setDistrict] = useState("all");
  const [maxPrice, setMaxPrice] = useState(1_000_000_000);
  const [areaSystem, setAreaSystem] = useState<"all" | AreaSystem>("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return properties.filter((property) => {
      const haystack = `${property.title} ${property.location.locality} ${property.location.district}`.toLowerCase();
      return (
        (type === "all" || property.type === type) &&
        (district === "all" || property.location.district === district) &&
        (areaSystem === "all" || property.area.system === areaSystem) &&
        property.priceNpr <= maxPrice &&
        (!term || haystack.includes(term))
      );
    });
  }, [areaSystem, district, maxPrice, properties, query, type]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = useMemo(
    () => filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [currentPage, filtered],
  );

  const resetFilters = useCallback(() => {
    setType("all");
    setDistrict("all");
    setMaxPrice(1_000_000_000);
    setAreaSystem("all");
    setQuery("");
  }, []);

  return (
    <section className="section property-section" id="properties" aria-labelledby="properties-title">
      <div className="site-shell">
        <div className="section-heading property-heading">
          <div>
            <p className="eyebrow"><ListFilter aria-hidden="true" /> Curated for real decisions</p>
            <h2 id="properties-title">Properties worth <em>seeing.</em></h2>
          </div>
          <p>Clear details, useful local context, and no mystery around measurements.</p>
        </div>

        <div className="property-tabs" role="tablist" aria-label="Property type">
          {(["all", "house", "land"] as const).map((value) => (
            <button
              key={value}
              role="tab"
              aria-selected={type === value}
              className={type === value ? "active" : ""}
              onClick={() => { setType(value); setPage(1); }}
            >
              {value === "all" ? "All properties" : value === "house" ? "Houses" : "Land"}
            </button>
          ))}
        </div>

        <div className="filter-panel">
          <label className="search-field">
            <span className="sr-only">Search by location or name</span>
            <Search aria-hidden="true" />
            <Input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Search location or property" />
          </label>
          <Select value={district} onValueChange={(value) => { setDistrict(value ?? "all"); setPage(1); }}>
            <SelectTrigger className="filter-select"><SelectValue placeholder="All locations" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All locations</SelectItem>
              {districts.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={String(maxPrice)} onValueChange={(value) => { setMaxPrice(Number(value)); setPage(1); }}>
            <SelectTrigger className="filter-select"><SelectValue placeholder="Any price" /></SelectTrigger>
            <SelectContent>{priceOptions.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={areaSystem} onValueChange={(value) => { setAreaSystem((value ?? "all") as "all" | AreaSystem); setPage(1); }}>
            <SelectTrigger className="filter-select"><SelectValue placeholder="Any measurement" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any measurement</SelectItem>
              <SelectItem value="hill">Ropani / aana</SelectItem>
              <SelectItem value="terai">Bigha / kattha / dhur</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="reset-button" onClick={resetFilters}><X /> Reset</Button>
        </div>

        <div className="results-meta">
          <span><SlidersHorizontal aria-hidden="true" /> {filtered.length} {filtered.length === 1 ? "property" : "properties"}</span>
          <span>Page {currentPage} of {pageCount}</span>
        </div>

        {visible.length ? (
          <div className="property-grid">
            {visible.map((property) => <PropertyCard key={property.id} property={property} />)}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No exact match yet.</h3>
            <p>Try widening the location or price. The right plot may be one filter away.</p>
            <Button onClick={resetFilters}>Clear all filters</Button>
          </div>
        )}

        <nav className="pagination" aria-label="Property pages">
          <Button variant="outline" size="icon-lg" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} aria-label="Previous page"><ChevronLeft /></Button>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
            <Button key={number} variant={currentPage === number ? "default" : "outline"} size="icon-lg" onClick={() => setPage(number)} aria-label={`Page ${number}`}>{number}</Button>
          ))}
          <Button variant="outline" size="icon-lg" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)} aria-label="Next page"><ChevronRight /></Button>
        </nav>
      </div>
    </section>
  );
}
