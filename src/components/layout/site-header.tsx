"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BadgePlus,
  Building2,
  LandPlot,
  Menu,
  Search,
} from "lucide-react";
import { Brand } from "@/components/layout/brand";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";

const mobileNav = [
  {
    label: "सम्पत्ति खोज्नुहोस्",
    description: "सबै घर-जग्गा हेर्नुहोस्",
    href: "/#properties",
    icon: Search,
  },
  {
    label: "घरहरू",
    description: "बिक्रीका उत्कृष्ट घरहरू",
    href: "/?type=house#property-filters",
    icon: Building2,
  },
  {
    label: "जग्गाहरू",
    description: "नेपालभरिका जग्गाहरू",
    href: "/?type=land#property-filters",
    icon: LandPlot,
  },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-shell header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {siteConfig.nav.map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link className="button button-primary header-cta" href="/#sell">
            आफ्नो सम्पति बेच्नुहोस्
          </Link>
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  className="mobile-menu-button"
                  variant="outline"
                  size="icon-lg"
                />
              }
            >
              <Menu aria-hidden="true" />
              <span className="sr-only">Open navigation</span>
            </SheetTrigger>
            <SheetContent className="mobile-sheet">
              <div className="mobile-sheet-brand">
                <Brand />
                <span>मेनु</span>
              </div>
              <SheetHeader className="mobile-sheet-header">
                <SheetTitle className="sr-only">घरजग्गा मेनु</SheetTitle>
                <SheetDescription>
                  नेपालभरि आफ्नो लागि सही घर वा जग्गा खोज्नुहोस्।
                </SheetDescription>
              </SheetHeader>
              <nav className="mobile-nav" aria-label="मोबाइल नेभिगेसन">
                {mobileNav.map((item) => (
                  <SheetClose
                    key={item.label}
                    render={
                      <Link className="mobile-nav-link" href={item.href} />
                    }
                  >
                    <span className="mobile-nav-icon">
                      <item.icon aria-hidden="true" />
                    </span>
                    <span className="mobile-nav-copy">
                      <strong>{item.label}</strong>
                      <small>{item.description}</small>
                    </span>
                    <ArrowUpRight
                      className="mobile-nav-arrow"
                      aria-hidden="true"
                    />
                  </SheetClose>
                ))}
              </nav>
              <div className="mobile-sheet-footer">
                <p>आफ्नो सम्पत्ति बेच्ने सोचमा हुनुहुन्छ?</p>
                <SheetClose
                  render={
                    <Link
                      className="button button-primary mobile-sheet-cta"
                      href="/#sell"
                    />
                  }
                >
                  <BadgePlus aria-hidden="true" /> आफ्नो सम्पति बेच्नुहोस्
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
