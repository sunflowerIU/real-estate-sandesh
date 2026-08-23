import { ArrowDownRight, Camera, FileCheck2, Handshake } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SellPropertyForm } from "@/components/sell/sell-property-form";

const steps = [
  { icon: FileCheck2, number: "01", title: "Share the essentials", copy: "Property type, area, location and expected price." },
  { icon: Camera, number: "02", title: "We review together", copy: "We clarify documents, photos and the market story." },
  { icon: Handshake, number: "03", title: "Meet serious buyers", copy: "Qualified enquiries and thoughtfully planned visits." },
];

export function SellSection() {
  return (
    <section className="section sell-section" id="sell" aria-labelledby="sell-title">
      <div className="site-shell sell-layout">
        <Reveal className="sell-copy">
          <p className="eyebrow eyebrow-light"><ArrowDownRight aria-hidden="true" /> Sell with confidence</p>
          <h2 id="sell-title">Your property has a story.<br /><em>Let’s tell it well.</em></h2>
          <p>Start with the facts. We’ll help shape a clear listing that gives serious buyers confidence to take the next step.</p>
          <div className="sell-steps">
            {steps.map((step) => (
              <div className="sell-step" key={step.number}>
                <span><step.icon aria-hidden="true" /></span>
                <div><small>{step.number}</small><strong>{step.title}</strong><p>{step.copy}</p></div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="sell-form-card" delay={0.15}>
          <div className="form-card-heading"><span>Free listing review</span><h3>Tell us about your property</h3><p>Usually takes less than two minutes.</p></div>
          <SellPropertyForm />
        </Reveal>
      </div>
    </section>
  );
}
