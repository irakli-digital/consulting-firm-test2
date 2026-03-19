import type { Locale, Dictionary } from "./types";
import { BRAND } from "./constants";

export function getLocalBusinessSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND.name,
    description:
      locale === "en"
        ? "Expert permit and licensing consulting services in Georgia"
        : "ნებართვებისა და ლიცენზიების საკონსულტაციო მომსახურება საქართველოში",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://geopermit.ge"}/${locale}`,
    telephone: BRAND.contact.phone,
    email: BRAND.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tbilisi",
      addressCountry: "GE",
    },
    areaServed: {
      "@type": "Country",
      name: "Georgia",
    },
  };
}

export function getFAQSchema(dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
