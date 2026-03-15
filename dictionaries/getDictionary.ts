import type { Locale, Dictionary } from "@/lib/types";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./en.json").then((m) => m.default as Dictionary),
  ka: () => import("./ka.json").then((m) => m.default as Dictionary),
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
