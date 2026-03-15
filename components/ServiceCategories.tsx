import type { Dictionary } from "@/lib/types";
import Container from "./ui/Container";
import SectionWrapper from "./ui/SectionWrapper";
import ServiceCard from "./ServiceCard";

export default function ServiceCategories({ dict }: { dict: Dictionary }) {
  return (
    <SectionWrapper id="services" bgColor="gray">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-navy sm:text-4xl">{dict.services.title}</h2>
          <p className="mt-4 text-lg text-slate-600">{dict.services.subtitle}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.services.items.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
