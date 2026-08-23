import { BadgeCheck, Compass, Scale, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const values = [
  { icon: BadgeCheck, title: "प्रमाणित विवरण", copy: "स्पष्टताका लागि समीक्षा गरिएको" },
  { icon: Scale, title: "स्थानीय मापन", copy: "आना, रोपनी, कट्ठा र धुर" },
  { icon: Compass, title: "बाटो र मोहडा", copy: "मूल्यमा फरक पार्ने जानकारी" },
  { icon: ShieldCheck, title: "मानवीय सहयोग", copy: "हरेक भ्रमणअघि सही मार्गदर्शन" },
];

export function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="घरजग्गा किन प्रयोग गर्ने">
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
