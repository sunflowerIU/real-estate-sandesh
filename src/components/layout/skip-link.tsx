"use client";

import { useSiteCopy } from "@/components/providers/language-provider";

export function SkipLink() {
  const copy = useSiteCopy();
  return <a className="skip-link" href="#main-content">{copy.skipLink}</a>;
}
