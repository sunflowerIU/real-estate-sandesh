"use client";

import Link from "next/link";
import { ArrowUpRight, Camera, MapPin } from "lucide-react";
import { Brand } from "@/components/layout/brand";
import { useLanguage } from "@/components/providers/language-provider";
import { SellPropertyDialogTrigger } from "@/components/sell/sell-property-dialog";
import { siteConfig } from "@/config/site";
import { navigationCopy } from "@/i18n/navigation";

export function SiteFooter() {
  const { language } = useLanguage();
  const copy = navigationCopy[language];

  return (
    <footer className="site-footer">
      <div className="site-shell footer-grid">
        <div className="footer-intro">
          <Brand inverse />
          <p>{copy.footer.intro}</p>
        </div>
        <div className="footer-column">
          <h3>{copy.footer.explore}</h3>
          {siteConfig.nav.map((item) =>
            item.href === "/#sell" ? (
              <SellPropertyDialogTrigger
                className="footer-dialog-trigger"
                key={item.key}
              >
                {copy[item.key]}
              </SellPropertyDialogTrigger>
            ) : (
              <Link key={item.key} href={item.href}>{copy[item.key]}</Link>
            ),
          )}
        </div>
        <div className="footer-column">
          <h3>{copy.footer.contact}</h3>
          <a href={`mailto:${siteConfig.salesEmail}`}>{siteConfig.salesEmail}</a>
          <a href={`tel:${siteConfig.phone.replaceAll(" ", "")}`}>{siteConfig.phone}</a>
          <span><MapPin aria-hidden="true" /> Kathmandu, Nepal</span>
        </div>
        <div className="footer-column">
          <h3>{copy.footer.follow}</h3>
          <a href="#" aria-label="Instagram">Instagram <Camera aria-hidden="true" /></a>
          <a href="#">{copy.footer.marketNotes} <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </div>
      <div className="site-shell footer-bottom">
        <span>© {new Date().getFullYear()} GharJagga. {copy.footer.demo}</span>
        <span>{copy.footer.madeFor}</span>
      </div>
    </footer>
  );
}
