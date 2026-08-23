import { ArrowDownRight, Camera, FileCheck2, Handshake } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SellPropertyForm } from "@/components/sell/sell-property-form";

const steps = [
  {
    icon: FileCheck2,
    number: "०१",
    title: "आवश्यक जानकारी दिनुहोस्",
    copy: "सम्पत्तिको प्रकार, क्षेत्रफल, ठेगाना र अपेक्षित मूल्य। / Property type, area, location and price.",
  },
  {
    icon: Camera,
    number: "०२",
    title: "सँगै समीक्षा गरौँ",
    copy: "कागजात, फोटो र बजारको अवस्था स्पष्ट गर्छौँ। / We review documents, photos and market context.",
  },
  {
    icon: Handshake,
    number: "०३",
    title: "गम्भीर खरिदकर्तासँग भेट्नुहोस्",
    copy: "उपयुक्त सोधपुछ र योजनाबद्ध भ्रमण। / Qualified enquiries and planned visits.",
  },
];

export function SellSection() {
  return (
    <section
      className="section sell-section"
      id="sell"
      aria-labelledby="sell-title"
    >
      <div className="site-shell sell-layout">
        <Reveal className="sell-copy">
          <p className="eyebrow eyebrow-light">
            <ArrowDownRight aria-hidden="true" /> विश्वासका साथ बेच्नुहोस् /
            Sell with confidence
          </p>
          <h2 id="sell-title">
            तपाईंको सम्पत्तिको आफ्नै कथा छ।
            <br />
            <em>त्यो कथा राम्रोसँग भनौ।</em>
          </h2>
          <p>
            आधारभूत जानकारीबाट सुरु गर्नुहोस्। हामी स्पष्ट र विश्वासिलो सूची
            तयार गर्न सहयोग गर्छौँ।
            <br />
            <span className="english-support">
              Start with the essentials. We’ll help create a clear listing
              serious buyers can trust.
            </span>
          </p>
          <div className="sell-steps">
            {steps.map((step) => (
              <div className="sell-step" key={step.number}>
                <span>
                  <step.icon aria-hidden="true" />
                </span>
                <div>
                  <small>{step.number}</small>
                  <strong>{step.title}</strong>
                  <p>{step.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="sell-form-card" delay={0.15}>
          <div className="form-card-heading">
            <span>निःशुल्क सूची समीक्षा / Free listing review</span>
            <h3>आफ्नो सम्पत्तिबारे बताउनुहोस्</h3>
            <p>
              Tell us about your property · सामान्यतया दुई मिनेटभन्दा कम समय
              लाग्छ। / Usually under two minutes.
            </p>
          </div>
          <SellPropertyForm />
        </Reveal>
      </div>
    </section>
  );
}
