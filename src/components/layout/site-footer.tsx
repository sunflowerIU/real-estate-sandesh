import Link from "next/link";
import { ArrowUpRight, Camera, MapPin } from "lucide-react";
import { Brand } from "@/components/layout/brand";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-shell footer-grid">
        <div className="footer-intro">
          <Brand inverse />
          <p>Clear property decisions, grounded in local knowledge.</p>
        </div>
        <div className="footer-column">
          <h3>Explore</h3>
          {siteConfig.nav.map((item) => (
            <Link key={item.label} href={item.href}>{item.label}</Link>
          ))}
        </div>
        <div className="footer-column">
          <h3>Contact</h3>
          <a href={`mailto:${siteConfig.salesEmail}`}>{siteConfig.salesEmail}</a>
          <a href={`tel:${siteConfig.phone.replaceAll(" ", "")}`}>{siteConfig.phone}</a>
          <span><MapPin aria-hidden="true" /> Kathmandu, Nepal</span>
        </div>
        <div className="footer-column">
          <h3>Follow</h3>
          <a href="#" aria-label="Instagram">Instagram <Camera aria-hidden="true" /></a>
          <a href="#">Market notes <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </div>
      <div className="site-shell footer-bottom">
        <span>© {new Date().getFullYear()} GharJagga. Demo listings only.</span>
        <span>Made thoughtfully in Nepal.</span>
      </div>
    </footer>
  );
}
