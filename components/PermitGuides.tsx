import type { Dictionary } from "@/lib/types";
import Container from "./ui/Container";
import SectionWrapper from "./ui/SectionWrapper";
import Accordion from "./Accordion";

export default function PermitGuides({ dict }: { dict: Dictionary }) {
  return (
    <SectionWrapper id="guides" bgColor="gray">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-navy sm:text-4xl">{dict.permitGuides.title}</h2>
          <p className="mt-4 text-lg text-slate-600">{dict.permitGuides.subtitle}</p>
        </div>
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          {dict.permitGuides.guides.map((guide, i) => (
            <Accordion key={i} title={guide.title} defaultOpen={i === 0}>
              <div className="space-y-4 text-slate-600">
                <div>
                  <h3 className="font-semibold text-navy">{dict.permitGuides.whatLabel}</h3>
                  <p>{guide.what}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-navy">{dict.permitGuides.whoLabel}</h3>
                  <p>{guide.who}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-navy">{dict.permitGuides.docsLabel}</h3>
                  <p>{guide.docs}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-navy">{dict.permitGuides.timelineLabel}</h3>
                  <p>{guide.timeline}</p>
                </div>
              </div>
            </Accordion>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
