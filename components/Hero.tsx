import type { Dictionary } from "@/lib/types";
import Container from "./ui/Container";
import Button from "./ui/Button";

export default function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden bg-red-600 pb-20 pt-32 sm:pt-40">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-teal blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-teal blur-3xl" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {dict.hero.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            {dict.hero.subheadline}
          </p>
          <div className="mt-10">
            <a href="#contact">
              <Button size="lg" variant="primary">
                {dict.hero.cta}
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
