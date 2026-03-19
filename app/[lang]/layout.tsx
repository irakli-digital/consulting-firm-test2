import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Georgian } from "next/font/google";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import getDictionary from "@/dictionaries/getDictionary";
import { getLocalBusinessSchema, getFAQSchema } from "@/lib/structuredData";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansGeorgian = Noto_Sans_Georgian({
  variable: "--font-noto-sans-georgian",
  subsets: ["georgian"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ka" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const supportedLocales = ["en", "ka"] as const;
  if (!supportedLocales.includes(lang as any)) {
    notFound();
  }
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://geopermit.ge";

  return {
    metadataBase: new URL(siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      url: `${siteUrl}/${locale}`,
      siteName: "GeoPermit",
      locale: locale === "ka" ? "ka_GE" : "en_US",
      type: "website",
    },
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        en: `${siteUrl}/en`,
        ka: `${siteUrl}/ka`,
        "x-default": `${siteUrl}/en`,
      },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const supportedLocales = ["en", "ka"] as const;
  if (!supportedLocales.includes(lang as any)) {
    notFound();
  }
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  const localBusinessSchema = getLocalBusinessSchema(locale);
  const faqSchema = getFAQSchema(dict);

  return (
    <html lang={locale} className={`${inter.variable} ${notoSansGeorgian.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-teal focus:px-4 focus:py-2 focus:text-white"
        >
          {dict.nav.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
