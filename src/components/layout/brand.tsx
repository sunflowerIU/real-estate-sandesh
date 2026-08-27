"use client";

import Link from "next/link";
import { useLanguage, useSiteCopy } from "@/components/providers/language-provider";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  const copy = useSiteCopy();
  const { language } = useLanguage();
  return (
    <Link className="brand" data-inverse={inverse} href="/" aria-label={language === "ne" ? "घरजग्गा गृहपृष्ठ" : "GharJagga home"}>
      <span className="brand-mark" aria-hidden="true">
        घ
      </span>
      <span>
        <strong>GharJagga</strong>
        <small>{copy.brandTagline}</small>
      </span>
    </Link>
  );
}
