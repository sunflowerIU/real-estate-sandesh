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
        alt="सूर्योदयको समयमा काठमाडौं उपत्यका हेर्दै गरेको आधुनिक घर"
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
            <MapPin aria-hidden="true" /> नेपालभरिका घर-जग्गा
          </p>
          <h1 id="hero-title">
            तपाईंका लागि <em>सही घर जग्गा खोज्नुहोस्।</em>
          </h1>
          <p className="hero-copy">
            प्रमाणित घर र जग्गा, तपाईंले बुझ्ने स्थानीय मापनमा—हरेक चरणमा उपयोगी
            जानकारीसहित।
          </p>
          <div className="hero-actions">
            <Link className="button button-accent" href="#properties">
              सम्पत्ति हेर्नुहोस् <ArrowDown aria-hidden="true" />
            </Link>
            <Link className="button button-ghost-light" href="#sell">
              हामीसँग बेच्नुहोस्
            </Link>
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
            <small>भैँसेपाटीको विशेष सम्पत्ति</small>
            <strong>६ आना २ पैसा</strong>
            <span>
              <BadgeCheck aria-hidden="true" /> कागजात प्रमाणित
            </span>
          </div>
        </motion.aside>
      </div>
      <div className="hero-marquee" aria-label="सम्पत्ति उपलब्ध क्षेत्रहरू">
        <span>काठमाडौं</span>
        <i />
        <span>ललितपुर</span>
        <i />
        <span>पोखरा</span>
        <i />
        <span>चितवन</span>
        <i />
        <span>विराटनगर</span>
      </div>
    </section>
  );
}
