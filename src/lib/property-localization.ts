import type { Language } from "@/i18n/navigation";
import type { Property } from "@/types/property";

const localityNe: Record<string, string> = {
  Baluwatar: "बालुवाटार", Chandragiri: "चन्द्रागिरि", Golfutar: "गोल्फुटार",
  Kapan: "कपन", Kirtipur: "कीर्तिपुर", Maharajgunj: "महाराजगञ्ज",
  Nagarjun: "नागार्जुन", Sankhu: "साँखु", Thankot: "थानकोट", Tokha: "टोखा",
  Kathmandu: "काठमाडौं",
};

const termsNe: Record<string, string> = {
  blacktopped: "कालोपत्रे", gravel: "ग्राभेल", concrete: "ढलान",
  east: "पूर्व", west: "पश्चिम", north: "उत्तर", south: "दक्षिण",
  "north-east": "उत्तर-पूर्व", "south-east": "दक्षिण-पूर्व",
};

export function localizePlace(value: string, language: Language) {
  return language === "ne" ? localityNe[value] ?? value : value;
}

export function localizeTerm(value: string, language: Language) {
  if (language === "ne") return termsNe[value] ?? value;
  return value.replaceAll("-", " ").replace(/^./, (letter) => letter.toUpperCase());
}

export function localizeArea(value: string, language: Language) {
  if (language === "en") return value;
  return value
    .replace(/[0-9]/g, (digit) => "०१२३४५६७८९"[Number(digit)] ?? digit)
    .replace(/ropani/gi, "रोपनी").replace(/aana/gi, "आना")
    .replace(/paisa/gi, "पैसा").replace(/daam/gi, "दाम")
    .replace(/bigha/gi, "बिघा").replace(/kattha/gi, "कट्ठा").replace(/dhur/gi, "धुर");
}

export function getLocalizedProperty(property: Property, language: Language) {
  const translation = property.translations?.[language];
  return {
    title: translation?.title ?? property.title,
    excerpt: translation?.excerpt ?? property.excerpt,
    description: translation?.description ?? property.description,
    amenities: translation?.amenities ?? property.amenities,
  };
}
