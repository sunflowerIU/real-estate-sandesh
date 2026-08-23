"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
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
            List your property
          </Link>
          <Sheet>
            <SheetTrigger
              render={<Button className="mobile-menu-button" variant="outline" size="icon-lg" />}
            >
              <Menu aria-hidden="true" />
              <span className="sr-only">Open navigation</span>
            </SheetTrigger>
            <SheetContent className="mobile-sheet">
              <SheetHeader>
                <SheetTitle>Explore GharJagga</SheetTitle>
                <SheetDescription>Find or list property anywhere in Nepal.</SheetDescription>
              </SheetHeader>
              <nav className="mobile-nav" aria-label="Mobile navigation">
                {siteConfig.nav.map((item) => (
                  <SheetClose key={item.label} render={<Link href={item.href} />}>
                    {item.label}
                  </SheetClose>
                ))}
              </nav>
              <SheetClose render={<Link className="button button-primary mobile-sheet-cta" href="/#sell" />}>
                List your property
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
