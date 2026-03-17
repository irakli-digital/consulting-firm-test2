import type { Metadata } from "next";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/dictionaries/getDictionary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";

const icons: Record<string, React.ReactNode> = {
  briefcase: (
    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  ),
  building: (
    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  ),
  globe: (
    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  landmark: (
    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
  ),
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return {
    title: `${dict.servicesPage.title} — GeoPermit`,
    description: dict.servicesPage.subtitle,
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Header lang={locale} dict={dict} />

      <main id="main-content">
        {/* Hero Banner */}
        <section className="bg-navy pt-28 pb-16 sm:pt-32 sm:pb-20">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold text-white sm:text-5xl">
                {dict.servicesPage.title}
              </h1>
              <p className="mt-6 text-lg text-slate-300 leading-relaxed">
                {dict.servicesPage.subtitle}
              </p>
            </div>
          </Container>
        </section>

        {/* Service Categories */}
        {dict.servicesPage.categories.map((category, index) => (
          <SectionWrapper
            key={category.title}
            id={category.icon}
            bgColor={index % 2 === 0 ? "white" : "gray"}
          >
            <Container>
              <div className={`flex flex-col gap-12 lg:flex-row lg:items-center ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
                {/* Content */}
                <div className="flex-1">
                  <div className="mb-4 inline-flex rounded-xl bg-teal/10 p-4 text-teal">
                    {icons[category.icon] || icons.briefcase}
                  </div>
                  <h2 className="text-3xl font-bold text-navy sm:text-4xl">
                    {category.title}
                  </h2>
                  <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                    {category.description}
                  </p>
                  <p className="mt-4 text-slate-500 leading-relaxed">
                    {category.longDescription}
                  </p>
                  <a
                    href={`/${locale}#contact`}
                    className="mt-8 inline-flex items-center gap-2 rounded-lg bg-teal px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-dark"
                  >
                    {dict.servicesPage.cta}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>

                {/* Features List */}
                <div className="flex-1">
                  <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
                    <h3 className="mb-6 text-lg font-semibold text-navy">
                      {dict.servicesPage.keyFeatures}
                    </h3>
                    <ul className="space-y-4">
                      {category.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <svg
                            className="mt-0.5 h-5 w-5 shrink-0 text-teal"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-slate-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Container>
          </SectionWrapper>
        ))}

        {/* Bottom CTA */}
        <SectionWrapper bgColor="navy">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                {dict.form.title}
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                {dict.form.subtitle}
              </p>
              <a
                href={`/${locale}#contact`}
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-teal px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-teal-dark"
              >
                {dict.servicesPage.cta}
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </Container>
        </SectionWrapper>
      </main>

      <Footer lang={locale} dict={dict} />
    </>
  );
}
