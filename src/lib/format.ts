import type { Language } from "@/i18n/navigation";

const NEPALI_DIGITS = "०१२३४५६७८९";

export function toNepaliDigits(value: string | number): string {
  return String(value).replace(
    /[0-9]/g,
    (digit) => NEPALI_DIGITS[Number(digit)] ?? digit,
  );
}

export function formatLocalizedNumber(value: string | number, language: Language) {
  return language === "ne" ? toNepaliDigits(value) : String(value);
}

function compactDecimal(value: number) {
  return value.toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
}

export function formatPropertyPrice(value: number, language: Language): string {
  const isCrore = value >= 10_000_000;
  const amount = compactDecimal(value / (isCrore ? 10_000_000 : 100_000));
  if (language === "ne") {
    return `रु. ${toNepaliDigits(amount)} ${isCrore ? "करोड" : "लाख"}`;
  }
  return `Rs. ${amount} ${isCrore ? "Cr" : "Lac"}`;
}

export function formatNpr(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-NP", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
