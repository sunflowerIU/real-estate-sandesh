"use client";

import { ArrowRight, Building2, LandPlot, Mountain } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { useLanguage, useSiteCopy } from "@/components/providers/language-provider";

export function UnitGuide() {
  const copy = useSiteCopy().units;
  const { language } = useLanguage();
  return (
    <section className="section unit-section" aria-labelledby="unit-title">
      <div className="site-shell unit-layout">
        <Reveal className="unit-copy">
          <p className="eyebrow"><LandPlot aria-hidden="true" /> {copy.eyebrow}</p>
          <h2 id="unit-title">{copy.titleLead}<br /><em>{copy.titleEmphasis}</em></h2>
          <p>{copy.copy}</p>
          <div className="unit-note"><span>{language === "ne" ? "१ रोपनी" : "1 ropani"}</span><ArrowRight /><strong>{language === "ne" ? "१६ आना" : "16 aana"}</strong><ArrowRight /><span>{language === "ne" ? "५,४७६ वर्गफिट" : "5,476 sq.ft."}</span></div>
          <div className="unit-note"><span>{language === "ne" ? "१ आना" : "1 aana"}</span><ArrowRight /><strong>{language === "ne" ? "४ पैसा" : "4 paisa"}</strong><ArrowRight /><span>{language === "ne" ? "३४२.२५ वर्गफिट" : "342.25 sq.ft."}</span></div>
        </Reveal>
        <div className="unit-cards">
          <Reveal className="unit-card hill-card" delay={0.1}>
            <span className="unit-card-icon"><Mountain aria-hidden="true" /></span>
            <small>{copy.standard}</small>
            <h3>{copy.standardTitle.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h3>
            <p>{copy.standardCopy}</p>
          </Reveal>
          <Reveal className="unit-card outer-kathmandu-card" delay={0.2}>
            <span className="unit-card-icon"><Building2 aria-hidden="true" /></span>
            <small>{copy.compare}</small>
            <h3>{copy.compareTitle.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h3>
            <p>{copy.compareCopy}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
