"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, BadgeCheck, Home, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { SellPropertyDialogTrigger } from "@/components/sell/sell-property-dialog";
import { useSiteCopy } from "@/components/providers/language-provider";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const copy = useSiteCopy().hero;
  const initial = reduceMotion ? false : { opacity: 0, y: 24 };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <Image
        className="hero-image"
        src="/house/hero-kathmandu.webp"
        alt={copy.imageAlt}
        fill
        priority
        sizes="100vw"
      />
      <div className="hero-overlay" />
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
      <div className="site-shell hero-content">
        <motion.div
          initial={initial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow eyebrow-light">
            <MapPin aria-hidden="true" /> {copy.eyebrow}
          </p>
          <h1 id="hero-title">
            {copy.titleLead} <em>{copy.titleEmphasis}</em>
          </h1>
          <p className="hero-copy">
            {copy.copy}
          </p>
          <div className="hero-actions">
            <Link className="button button-accent" href="#properties">
              {copy.browse} <ArrowDown aria-hidden="true" />
            </Link>
            <SellPropertyDialogTrigger className="button button-ghost-light">
              {copy.sell}
            </SellPropertyDialogTrigger>
          </div>
        </motion.div>
        <motion.aside
          className="hero-fact-card"
          initial={reduceMotion ? false : { opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="hero-fact-icon">
            <Home aria-hidden="true" />
          </span>
          <div>
            <small>{copy.featured}</small>
            <strong>{copy.area}</strong>
            <span>
              <BadgeCheck aria-hidden="true" /> {copy.verified}
            </span>
          </div>
        </motion.aside>
      </div>
      <div className="hero-marquee" aria-label={copy.areasLabel}>
        <span>{copy.eyebrow.includes("काठमाडौं") ? "बुढानीलकण्ठ" : "Budhanilkantha"}</span>
        <i />
        <span>{copy.eyebrow.includes("काठमाडौं") ? "बालुवाटार" : "Baluwatar"}</span>
        <i />
        <span>{copy.eyebrow.includes("काठमाडौं") ? "महाराजगञ्ज" : "Maharajgunj"}</span>
        <i />
        <span>{copy.eyebrow.includes("काठमाडौं") ? "टोखा" : "Tokha"}</span>
        <i />
        <span>{copy.eyebrow.includes("काठमाडौं") ? "कीर्तिपुर" : "Kirtipur"}</span>
      </div>
    </section>
  );
}
