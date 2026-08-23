"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, ListFilter, MapPinned, Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { PropertyCard } from "@/components/properties/property-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import type { AreaSystem, Property, PropertyType } from "@/types/property";

const PAGE_SIZE = 6;
const priceOptions = [
  { value: "1000000000", label: "जुनसुकै मूल्य" },
  { value: "10000000", label: "रु. १ करोडसम्म" },
  { value: "25000000", label: "रु. २.५ करोडसम्म" },
  { value: "50000000", label: "रु. ५ करोडसम्म" },
  { value: "75000000", label: "रु. ७.५ करोडसम्म" },
  { value: "5000000", label: "रु. ५० लाखभन्दा कम" },
];

const districtLabels: Record<string, string> = {
  Kathmandu: "काठमाडौं",
  Lalitpur: "ललितपुर",
  Chitwan: "चितवन",
  Sunsari: "सुनसरी",
  Kaski: "कास्की",
  Morang: "मोरङ",
};

const nepaliNumber = new Intl.NumberFormat("ne-NP");

function buildPropertiesUrl(type: "all" | PropertyType, page = 1, includeAnchor = true) {
  const params = new URLSearchParams();
  if (type !== "all") params.set("type", type);
  if (page > 1) params.set("page", String(page));
  const queryString = params.toString();
  return `${queryString ? `/?${queryString}` : "/"}${includeAnchor ? "#properties" : ""}`;
}

export function PropertyExplorer({ properties, districts }: { properties: Property[]; districts: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedType = searchParams.get("type");
  const type: "all" | PropertyType = requestedType === "house" || requestedType === "land" ? requestedType : "all";
  const [district, setDistrict] = useState("all");
  const [maxPrice, setMaxPrice] = useState(1_000_000_000);
  const [areaSystem, setAreaSystem] = useState<"all" | AreaSystem>("all");
  const [query, setQuery] = useState("");
  const requestedPage = Number.parseInt(searchParams.get("page") ?? "1", 10);

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
  const currentPage = Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), pageCount) : 1;
  const visible = useMemo(
    () => filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [currentPage, filtered],
  );

  const resetFilters = useCallback(() => {
    router.replace(buildPropertiesUrl("all"), { scroll: false });
    setDistrict("all");
    setMaxPrice(1_000_000_000);
    setAreaSystem("all");
    setQuery("");
  }, [router]);

  const selectPropertyType = useCallback((value: "all" | PropertyType) => {
    router.replace(buildPropertiesUrl(value), { scroll: false });
  }, [router]);

  const resetPagination = useCallback(() => {
    if (currentPage > 1) router.replace(buildPropertiesUrl(type), { scroll: false });
  }, [currentPage, router, type]);

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
            <p className="eyebrow"><Sparkles aria-hidden="true" /> तपाईंका लागि छानिएका सम्पत्ति</p>
            <h2 id="properties-title">नेपालभरिका उत्कृष्ट <em>घर-जग्गा</em></h2>
          </div>
          <div className="property-heading-note">
            <span><MapPinned aria-hidden="true" /></span>
            <p><strong>{nepaliNumber.format(districts.length)} जिल्ला</strong>मा स्पष्ट विवरण, स्थानीय मापन र उपयोगी जानकारीसहितका सम्पत्ति।</p>
          </div>
        </div>

        <div className="property-discovery" id="property-filters">
          <div className="discovery-topline">
            <div>
              <ListFilter aria-hidden="true" />
              <span>आफ्नो आवश्यकता अनुसार खोज्नुहोस्</span>
            </div>
            <div className="property-tabs" role="tablist" aria-label="सम्पत्तिको प्रकार">
              {(["all", "house", "land"] as const).map((value) => (
                <button
                  key={value}
                  role="tab"
                  aria-selected={type === value}
                  className={type === value ? "active" : ""}
                  onClick={() => selectPropertyType(value)}
                >
                  {value === "all" ? "सबै सम्पत्ति" : value === "house" ? "घर" : "जग्गा"}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-panel">
            <label className="search-field">
              <span className="sr-only">ठाउँ वा सम्पत्तिको नाम खोज्नुहोस्</span>
              <Search aria-hidden="true" />
              <Input value={query} onChange={(event) => { setQuery(event.target.value); resetPagination(); }} placeholder="ठाउँ वा सम्पत्ति खोज्नुहोस्" />
            </label>
            <Select value={district} onValueChange={(value) => { setDistrict(value ?? "all"); resetPagination(); }}>
              <SelectTrigger className="filter-select">
                <span>{district === "all" ? "सबै स्थान" : districtLabels[district] ?? district}</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">सबै स्थान</SelectItem>
                {districts.map((item) => <SelectItem key={item} value={item}>{districtLabels[item] ?? item}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={String(maxPrice)} onValueChange={(value) => { setMaxPrice(Number(value)); resetPagination(); }}>
              <SelectTrigger className="filter-select">
                <span>{priceOptions.find((option) => Number(option.value) === maxPrice)?.label ?? "जुनसुकै मूल्य"}</span>
              </SelectTrigger>
              <SelectContent>{priceOptions.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={areaSystem} onValueChange={(value) => { setAreaSystem((value ?? "all") as "all" | AreaSystem); resetPagination(); }}>
              <SelectTrigger className="filter-select">
                <span>{areaSystem === "all" ? "जुनसुकै मापन" : areaSystem === "hill" ? "रोपनी / आना" : "बिघा / कट्ठा / धुर"}</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">जुनसुकै मापन</SelectItem>
                <SelectItem value="hill">रोपनी / आना</SelectItem>
                <SelectItem value="terai">बिघा / कट्ठा / धुर</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="reset-button" onClick={resetFilters}><X /> फिल्टर हटाउनुहोस्</Button>
          </div>
        </div>

        <div className="results-meta">
          <span><SlidersHorizontal aria-hidden="true" /> {nepaliNumber.format(filtered.length)} वटा सम्पत्ति भेटिए</span>
          <span>पृष्ठ {nepaliNumber.format(currentPage)} / {nepaliNumber.format(pageCount)}</span>
        </div>

        {visible.length ? (
          <div className="property-grid">
            {visible.map((property) => <PropertyCard key={property.id} property={property} />)}
          </div>
        ) : (
          <div className="empty-state">
            <h3>ठ्याक्कै मिल्ने सम्पत्ति भेटिएन।</h3>
            <p>स्थान वा मूल्यको दायरा फराकिलो बनाएर फेरि खोज्नुहोस्।</p>
            <Button onClick={resetFilters}>सबै फिल्टर हटाउनुहोस्</Button>
          </div>
        )}

        <nav className="pagination" aria-label="सम्पत्तिका पृष्ठहरू">
          <Button className="pagination-nav" variant="ghost" disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)} aria-label="अघिल्लो पृष्ठ"><ChevronLeft /><span className="pagination-label">अघिल्लो</span></Button>
          <div className="pagination-pages">
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
            <Button
              key={number}
              className={`pagination-page${currentPage === number ? " active" : ""}`}
              variant="ghost"
              size="icon-lg"
              onClick={() => goToPage(number)}
              aria-label={`पृष्ठ ${nepaliNumber.format(number)}`}
              aria-current={currentPage === number ? "page" : undefined}
            >
              {nepaliNumber.format(number)}
            </Button>
          ))}
          </div>
          <Button className="pagination-nav" variant="ghost" disabled={currentPage === pageCount} onClick={() => goToPage(currentPage + 1)} aria-label="अर्को पृष्ठ"><span className="pagination-label">अर्को</span><ChevronRight /></Button>
        </nav>
      </div>
    </section>
  );
}
