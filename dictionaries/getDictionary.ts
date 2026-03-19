import type { Locale, Dictionary } from "@/lib/types";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./en.json").then((m) => m.default as Dictionary),
  ka: () => import("./ka.json").then((m) => m.default as Dictionary),
};

function validateDictionary(dict: unknown, locale: string): dict is Dictionary {
  if (!dict || typeof dict !== "object") return false;
  const requiredKeys = [
    "meta", "nav", "hero", "trustBar", "services",
    "howItWorks", "permitGuides", "testimonials", "faq", "form", "footer"
  ];
  return requiredKeys.every((key) => key in (dict as Record<string, unknown>));
}

export default async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loader = dictionaries[locale];
  if (!loader) {
    throw new Error(`Unsupported locale: ${locale}`);
  }
  const dict = await loader();
  if (!validateDictionary(dict, locale)) {
    throw new Error(`Invalid dictionary structure for locale: ${locale}`);
  }
  return dict;
}
