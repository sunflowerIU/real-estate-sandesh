"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={cn("language-switcher", className)}
      role="group"
      aria-label="भाषा छान्नुहोस् / Choose language"
    >
      <Languages aria-hidden="true" />
      <button
        className={language === "ne" ? "active" : ""}
        type="button"
        aria-pressed={language === "ne"}
        onClick={() => setLanguage("ne")}
      >
        नेपाली
      </button>
      <span aria-hidden="true" />
      <button
        className={language === "en" ? "active" : ""}
        type="button"
        aria-pressed={language === "en"}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
    </div>
  );
}
