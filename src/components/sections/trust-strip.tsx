"use client";

import { BadgeCheck, Compass, Scale, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { useSiteCopy } from "@/components/providers/language-provider";

const icons = [BadgeCheck, Scale, Compass, ShieldCheck];

export function TrustStrip() {
  const copy = useSiteCopy().trust;
  return (
    <section className="trust-strip" aria-label={copy.label}>
      <div className="site-shell trust-grid">
        {copy.items.map(([title, description], index) => {
          const Icon = icons[index];
          return <Reveal key={title} delay={index * 0.06} className="trust-item">
            <Icon aria-hidden="true" />
            <div><strong>{title}</strong><span>{description}</span></div>
          </Reveal>
        })}
      </div>
    </section>
  );
}
