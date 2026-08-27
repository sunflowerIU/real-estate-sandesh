"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, ListFilter, MapPinned, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { PropertyCard } from "@/components/properties/property-card";
import {
  PropertySearchAutocomplete,
  type PropertySearchSuggestion,
} from "@/components/properties/property-search-autocomplete";
import { Button } from "@/components/ui/button";
import { useLanguage, useSiteCopy } from "@/components/providers/language-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { formatLocalizedNumber } from "@/lib/format";
import { getLocalizedProperty, localizePlace } from "@/lib/property-localization";
import type { AreaSystem, Property, PropertyType } from "@/types/property";

const PAGE_SIZE = 6;
function buildPropertiesUrl(type: "all" | PropertyType, page = 1, includeAnchor = true) {
  const params = new URLSearchParams();
  if (type !== "all") params.set("type", type);
  if (page > 1) params.set("page", String(page));
  const queryString = params.toString();
  return `${queryString ? `/?${queryString}` : "/"}${includeAnchor ? "#properties" : ""}`;
}

export function PropertyExplorer({ properties, localities }: { properties: Property[]; localities: string[] }) {
  const { language } = useLanguage();
  const copy = useSiteCopy().explorer;
  const priceOptions = copy.priceOptions.map(([value, label]) => ({ value, label }));
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedType = searchParams.get("type");
  const type: "all" | PropertyType = requestedType === "house" || requestedType === "land" ? requestedType : "all";
  const [locality, setLocality] = useState("all");
  const [maxPrice, setMaxPrice] = useState(1_000_000_000);
  const [areaSystem, setAreaSystem] = useState<"all" | AreaSystem>("all");
  const [query, setQuery] = useState("");
  const requestedPage = Number.parseInt(searchParams.get("page") ?? "1", 10);

  const searchSuggestions = useMemo<PropertySearchSuggestion[]>(
    () => [
      ...localities.map((item) => ({
        value: item,
        label: localizePlace(item, language),
        description: `${localizePlace(item, language)} · ${localizePlace("Kathmandu", language)}`,
        kind: "location" as const,
      })),
      ...properties.map((property) => {
        const localized = getLocalizedProperty(property, language);
        return {
          value: localized.title,
          label: localized.title,
          description: `${property.type === "house" ? copy.house : copy.land} · ${localizePlace(property.location.locality, language)}`,
          kind: "property" as const,
        };
      }),
    ],
    [copy.house, copy.land, language, localities, properties],
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return properties.filter((property) => {
      const localized = getLocalizedProperty(property, language);
      const haystack = `${property.title} ${localized.title} ${property.location.locality} ${localizePlace(property.location.locality, "ne")} ${property.location.municipality} ${property.location.district}`.toLowerCase();
      return (
        (type === "all" || property.type === type) &&
        (locality === "all" || property.location.locality === locality) &&
        (areaSystem === "all" || property.area.system === areaSystem) &&
        property.priceNpr <= maxPrice &&
        (!term || haystack.includes(term))
      );
    });
  }, [areaSystem, language, locality, maxPrice, properties, query, type]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), pageCount) : 1;
  const visible = useMemo(
    () => filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [currentPage, filtered],
  );

  const resetFilters = useCallback(() => {
    router.replace(buildPropertiesUrl("all"), { scroll: false });
    setLocality("all");
    setMaxPrice(1_000_000_000);
    setAreaSystem("all");
    setQuery("");
  }, [router, setAreaSystem, setLocality, setMaxPrice, setQuery]);

  const selectPropertyType = useCallback((value: "all" | PropertyType) => {
    router.replace(buildPropertiesUrl(value), { scroll: false });
  }, [router]);

  const resetPagination = useCallback(() => {
    if (currentPage > 1) router.replace(buildPropertiesUrl(type), { scroll: false });
  }, [currentPage, router, type]);

  const updateQuery = useCallback((value: string) => {
    setQuery(value);
    resetPagination();
  }, [resetPagination]);

  const goToPage = useCallback((nextPage: number) => {
    router.replace(buildPropertiesUrl(type, nextPage, false), { scroll: false });
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const propertySection = document.getElementById("properties");
        const siteHeader = document.querySelector<HTMLElement>(".site-header");
        if (!propertySection) return;

        const headerOffset = siteHeader?.offsetHeight ?? 0;
        const sectionTop = propertySection.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: Math.max(0, sectionTop - headerOffset - 16),
          behavior: "smooth",
        });
      });
    });
  }, [router, type]);

  return (
    <section className="section property-section" id="properties" aria-labelledby="properties-title">
      <div className="site-shell">
        <div className="section-heading property-heading">
          <div className="property-heading-copy">
            <p className="eyebrow"><Sparkles aria-hidden="true" /> {copy.eyebrow}</p>
            <h2 id="properties-title">{copy.titleLead} <em>{copy.titleEmphasis}</em></h2>
          </div>
          <div className="property-heading-note">
            <span><MapPinned aria-hidden="true" /></span>
            <p><strong>{copy.areaSummary(formatLocalizedNumber(localities.length, language))}</strong> {copy.summary}</p>
          </div>
        </div>

        <div className="property-discovery" id="property-filters">
          <div className="discovery-topline">
            <div>
              <ListFilter aria-hidden="true" />
              <span>{copy.prompt}</span>
            </div>
            <div className="property-tabs" role="tablist" aria-label={copy.typeLabel}>
              {(["all", "house", "land"] as const).map((value) => (
                <button
                  key={value}
                  role="tab"
                  aria-selected={type === value}
                  className={type === value ? "active" : ""}
                  onClick={() => selectPropertyType(value)}
                >
                  {value === "all" ? copy.allProperties : value === "house" ? copy.house : copy.land}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-panel">
            <PropertySearchAutocomplete
              value={query}
              suggestions={searchSuggestions}
              onValueChange={updateQuery}
              copy={{ label: copy.searchLabel, placeholder: copy.searchPlaceholder, suggestionsLabel: copy.suggestionsLabel, suggestionsHeading: copy.suggestionsHeading }}
            />
            <Select value={locality} onValueChange={(value) => { setLocality(value ?? "all"); resetPagination(); }}>
              <SelectTrigger className="filter-select">
                <span>{locality === "all" ? copy.allAreas : localizePlace(locality, language)}</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{copy.allAreas}</SelectItem>
                {localities.map((item) => <SelectItem key={item} value={item}>{localizePlace(item, language)}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={String(maxPrice)} onValueChange={(value) => { setMaxPrice(Number(value)); resetPagination(); }}>
              <SelectTrigger className="filter-select">
                <span>{priceOptions.find((option) => Number(option.value) === maxPrice)?.label ?? copy.anyPrice}</span>
              </SelectTrigger>
              <SelectContent>{priceOptions.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={areaSystem} onValueChange={(value) => { setAreaSystem((value ?? "all") as "all" | AreaSystem); resetPagination(); }}>
              <SelectTrigger className="filter-select">
                <span>{areaSystem === "all" ? copy.anyMeasurement : copy.hillMeasurement}</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{copy.anyMeasurement}</SelectItem>
                <SelectItem value="hill">{copy.hillMeasurement}</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="reset-button" onClick={resetFilters}><X /> {copy.reset}</Button>
          </div>
        </div>

        <div className="results-meta">
          <span><SlidersHorizontal aria-hidden="true" /> {copy.found(formatLocalizedNumber(filtered.length, language))}</span>
          <span>{copy.page(formatLocalizedNumber(currentPage, language), formatLocalizedNumber(pageCount, language))}</span>
        </div>

        {visible.length ? (
          <div className="property-grid">
            {visible.map((property) => <PropertyCard key={property.id} property={property} />)}
          </div>
        ) : (
          <div className="empty-state">
            <h3>{copy.emptyTitle}</h3>
            <p>{copy.emptyCopy}</p>
            <Button onClick={resetFilters}>{copy.resetAll}</Button>
          </div>
        )}

        <nav className="pagination" aria-label={copy.pagesLabel}>
          <Button className="pagination-nav" variant="ghost" disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)} aria-label={copy.previous}><ChevronLeft /><span className="pagination-label">{copy.previous}</span></Button>
          <div className="pagination-pages">
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
            <Button
              key={number}
              className={`pagination-page${currentPage === number ? " active" : ""}`}
              variant="ghost"
              size="icon-lg"
              onClick={() => goToPage(number)}
              aria-label={copy.pageLabel(formatLocalizedNumber(number, language))}
              aria-current={currentPage === number ? "page" : undefined}
            >
              {formatLocalizedNumber(number, language)}
            </Button>
          ))}
          </div>
          <Button className="pagination-nav" variant="ghost" disabled={currentPage === pageCount} onClick={() => goToPage(currentPage + 1)} aria-label={copy.next}><span className="pagination-label">{copy.next}</span><ChevronRight /></Button>
        </nav>
      </div>
    </section>
  );
}
