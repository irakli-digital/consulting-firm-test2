import type { Locale } from "@/lib/types";
import { getDictionary } from "@/dictionaries/getDictionary";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ServiceCategories from "@/components/ServiceCategories";
import HowItWorks from "@/components/HowItWorks";
import PermitGuides from "@/components/PermitGuides";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Footer from "@/components/Footer";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default async function Page({
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
        <Hero dict={dict} />
        <TrustBar dict={dict} />
        <ServiceCategories dict={dict} />
        <HowItWorks dict={dict} />
        <PermitGuides dict={dict} />
        <Testimonials dict={dict} />
        <FAQ dict={dict} />

        <SectionWrapper id="contact" bgColor="navy">
          <Container>
            <div className="mx-auto max-w-2xl">
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  {dict.form.title}
                </h2>
                <p className="mt-4 text-lg text-slate-300">
                  {dict.form.subtitle}
                </p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-10">
                <LeadCaptureForm dict={dict} lang={locale} />
              </div>
            </div>
          </Container>
        </SectionWrapper>
      </main>

      <Footer lang={locale} dict={dict} />
    </>
  );
}
