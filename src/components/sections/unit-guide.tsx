import { ArrowRight, LandPlot, Mountain, Sprout } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export function UnitGuide() {
  return (
    <section className="section unit-section" aria-labelledby="unit-title">
      <div className="site-shell unit-layout">
        <Reveal className="unit-copy">
          <p className="eyebrow"><LandPlot aria-hidden="true" /> Land, translated clearly</p>
          <h2 id="unit-title">Local units.<br /><em>One clear picture.</em></h2>
          <p>
            We preserve the measurement used in the property’s region and store a normalized square-foot value behind the scenes—so future comparisons and filters stay reliable.
          </p>
          <div className="unit-note"><span>1 ropani</span><ArrowRight /><strong>16 aana</strong><ArrowRight /><span>5,476 sq.ft.</span></div>
          <div className="unit-note"><span>1 bigha</span><ArrowRight /><strong>20 kattha</strong><ArrowRight /><span>72,900 sq.ft.</span></div>
        </Reveal>
        <div className="unit-cards">
          <Reveal className="unit-card hill-card" delay={0.1}>
            <span className="unit-card-icon"><Mountain aria-hidden="true" /></span>
            <small>Hill system</small>
            <h3>Ropani · Aana<br />Paisa · Daam</h3>
            <p>Common across Kathmandu Valley, Pokhara and hilly regions.</p>
          </Reveal>
          <Reveal className="unit-card terai-card" delay={0.2}>
            <span className="unit-card-icon"><Sprout aria-hidden="true" /></span>
            <small>Terai system</small>
            <h3>Bigha · Kattha<br />Dhur</h3>
            <p>Common across Chitwan, Sunsari, Morang and the southern plains.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
