import { BadgeCheck, Compass, Scale, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const values = [
  { icon: BadgeCheck, title: "Verified details", copy: "Listings reviewed for clarity" },
  { icon: Scale, title: "Local measurements", copy: "Aana, ropani, kattha & dhur" },
  { icon: Compass, title: "Road & facing", copy: "The context that changes value" },
  { icon: ShieldCheck, title: "Human support", copy: "Guidance before every visit" },
];

export function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Why use GharJagga">
      <div className="site-shell trust-grid">
        {values.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.06} className="trust-item">
            <item.icon aria-hidden="true" />
            <div><strong>{item.title}</strong><span>{item.copy}</span></div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
