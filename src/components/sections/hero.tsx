"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, BadgeCheck, Home, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : { opacity: 0, y: 24 };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <Image
        className="hero-image"
        src="/house/hero-kathmandu.webp"
        alt="Contemporary home overlooking Kathmandu Valley at sunrise"
        fill
        priority
        sizes="100vw"
      />
      <div className="hero-overlay" />
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
      <div className="site-shell hero-content">
        <motion.div initial={initial} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="eyebrow eyebrow-light"><MapPin aria-hidden="true" /> Property, rooted in Nepal</p>
          <h1 id="hero-title">Find a place that feels <em>meant for you.</em></h1>
          <p className="hero-copy">
            Verified homes and land, explained in the measurements you know—with local context at every step.
          </p>
          <div className="hero-actions">
            <Link className="button button-accent" href="#properties">
              Explore properties <ArrowDown aria-hidden="true" />
            </Link>
            <Link className="button button-ghost-light" href="#sell">Sell with us</Link>
          </div>
        </motion.div>
        <motion.aside
          className="hero-fact-card"
          initial={reduceMotion ? false : { opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="hero-fact-icon"><Home aria-hidden="true" /></span>
          <div>
            <small>Featured in Bhaisepati</small>
            <strong>6 aana 2 paisa</strong>
            <span><BadgeCheck aria-hidden="true" /> Documents verified</span>
          </div>
        </motion.aside>
      </div>
      <div className="hero-marquee" aria-label="Property coverage">
        <span>Kathmandu</span><i />
        <span>Lalitpur</span><i />
        <span>Pokhara</span><i />
        <span>Chitwan</span><i />
        <span>Biratnagar</span>
      </div>
    </section>
  );
}
