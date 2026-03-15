import type { Dictionary } from "@/lib/types";
import Container from "./ui/Container";
import SectionWrapper from "./ui/SectionWrapper";
import TestimonialCard from "./TestimonialCard";

export default function Testimonials({ dict }: { dict: Dictionary }) {
  return (
    <SectionWrapper id="testimonials">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-navy sm:text-4xl">{dict.testimonials.title}</h2>
          <p className="mt-4 text-lg text-slate-600">{dict.testimonials.subtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {dict.testimonials.items.map((item, i) => (
            <TestimonialCard key={i} quote={item.quote} name={item.name} role={item.role} />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
