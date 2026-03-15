import type { Dictionary } from "@/lib/types";
import Container from "./ui/Container";
import SectionWrapper from "./ui/SectionWrapper";
import Accordion from "./Accordion";

export default function FAQ({ dict }: { dict: Dictionary }) {
  return (
    <SectionWrapper id="faq" bgColor="gray">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-navy sm:text-4xl">{dict.faq.title}</h2>
          <p className="mt-4 text-lg text-slate-600">{dict.faq.subtitle}</p>
        </div>
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          {dict.faq.items.map((item, i) => (
            <Accordion key={i} title={item.question}>
              <p className="text-slate-600 leading-relaxed">{item.answer}</p>
            </Accordion>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
