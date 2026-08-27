"use client";

import { ArrowDownRight, BadgePlus, Camera, FileCheck2, Handshake, Mail } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { useSiteCopy } from "@/components/providers/language-provider";
import { SellPropertyDialogTrigger } from "@/components/sell/sell-property-dialog";

const stepIcons = [FileCheck2, Camera, Handshake];

export function SellSection() {
  const copy = useSiteCopy().sell;
  return (
    <section
      className="section sell-section"
      id="sell"
      aria-labelledby="sell-title"
    >
      <div className="site-shell sell-layout">
        <Reveal className="sell-copy">
          <p className="eyebrow eyebrow-light">
            <ArrowDownRight aria-hidden="true" /> {copy.eyebrow}
          </p>
          <h2 id="sell-title">
            {copy.titleLead}
            <br />
            <em>{copy.titleEmphasis}</em>
          </h2>
          <p>{copy.copy}</p>
          <div className="sell-steps">
            {copy.steps.map(([number, title, description], index) => {
              const Icon = stepIcons[index];
              return <div className="sell-step" key={number}>
                <span>
                  <Icon aria-hidden="true" />
                </span>
                <div>
                  <small>{number}</small>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </div>
              </div>
            })}
          </div>
        </Reveal>
        <Reveal className="sell-cta-card" delay={0.15}>
          <span className="sell-cta-icon" aria-hidden="true">
            <BadgePlus />
          </span>
          <div className="sell-cta-copy">
            <span>{copy.review}</span>
            <h3>{copy.cardTitle}</h3>
            <p>{copy.cardCopy}</p>
          </div>
          <SellPropertyDialogTrigger className="button button-accent sell-modal-trigger">
            {copy.send}
          </SellPropertyDialogTrigger>
          <small className="sell-cta-note">
            <Mail aria-hidden="true" /> {copy.note}
          </small>
        </Reveal>
      </div>
    </section>
  );
}
