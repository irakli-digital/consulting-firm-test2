import Image from "next/image";
import type { Dictionary } from "@/lib/types";
import Container from "./ui/Container";
import SectionWrapper from "./ui/SectionWrapper";

export default function HowItWorks({ dict }: { dict: Dictionary }) {
  return (
    <SectionWrapper id="how-it-works">
      <Container>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-navy sm:text-4xl">{dict.howItWorks.title}</h2>
          <p className="mt-4 text-lg text-slate-600">{dict.howItWorks.subtitle}</p>
        </div>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Steps */}
          <div className="space-y-10">
            {dict.howItWorks.steps.map((step) => (
              <div key={step.step} className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-teal text-lg font-bold text-white shadow-lg shadow-teal/30">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-navy">{step.title}</h3>
                  <p className="mt-2 text-slate-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Photo */}
          <div className="relative hidden aspect-[4/5] overflow-hidden rounded-2xl lg:block">
            <Image
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7"
              alt={dict.howItWorks.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
