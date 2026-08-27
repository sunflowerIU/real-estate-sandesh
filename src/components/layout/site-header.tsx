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
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { useLanguage } from "@/components/providers/language-provider";
import { SellPropertyDialogTrigger } from "@/components/sell/sell-property-dialog";
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
import { navigationCopy } from "@/i18n/navigation";

const mobileNav = [
  {
    key: "buy",
    href: "/#properties",
    icon: Search,
  },
  {
    key: "houses",
    href: "/?type=house#property-filters",
    icon: Building2,
  },
  {
    key: "land",
    href: "/?type=land#property-filters",
    icon: LandPlot,
  },
] as const;

export function SiteHeader() {
  const { language } = useLanguage();
  const copy = navigationCopy[language];

  return (
    <header className="site-header">
      <div className="site-shell header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label={copy.navigationLabel}>
          {siteConfig.nav.map((item) =>
            item.href === "/#sell" ? (
              <SellPropertyDialogTrigger
                className="nav-dialog-trigger"
                key={item.key}
              >
                {copy[item.key]}
              </SellPropertyDialogTrigger>
            ) : (
              <Link key={item.key} href={item.href}>
                {copy[item.key]}
              </Link>
            ),
          )}
          <LanguageSwitcher className="desktop-language-switcher" />
        </nav>
        <div className="header-actions">
          <SellPropertyDialogTrigger className="button button-primary header-cta">
            {copy.listProperty}
          </SellPropertyDialogTrigger>
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
              <span className="sr-only">{copy.openMenu}</span>
            </SheetTrigger>
            <SheetContent className="mobile-sheet">
              <div className="mobile-sheet-brand">
                <Brand />
                <span>{copy.menu}</span>
              </div>
              <SheetHeader className="mobile-sheet-header">
                <SheetTitle className="sr-only">{copy.menuTitle}</SheetTitle>
                <SheetDescription>
                  {copy.menuDescription}
                </SheetDescription>
                <LanguageSwitcher className="mobile-language-switcher" />
              </SheetHeader>
              <nav className="mobile-nav" aria-label={copy.mobileNavigationLabel}>
                {mobileNav.map((item) => (
                  <SheetClose
                    key={item.key}
                    render={
                      <Link className="mobile-nav-link" href={item.href} />
                    }
                  >
                    <span className="mobile-nav-icon">
                      <item.icon aria-hidden="true" />
                    </span>
                    <span className="mobile-nav-copy">
                      <strong>{copy[item.key]}</strong>
                      <small>{copy.mobile[item.key]}</small>
                    </span>
                    <ArrowUpRight
                      className="mobile-nav-arrow"
                      aria-hidden="true"
                    />
                  </SheetClose>
                ))}
              </nav>
              <div className="mobile-sheet-footer">
                <p>{copy.sellPrompt}</p>
                <SheetClose
                  render={
                    <SellPropertyDialogTrigger
                      className="button button-primary mobile-sheet-cta"
                    />
                  }
                >
                  <BadgePlus aria-hidden="true" /> {copy.listProperty}
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
