import type { Dictionary } from "@/lib/types";
import Container from "./ui/Container";

export default function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden bg-red-800 pb-20 pt-32 sm:pt-40">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-red-500 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-red-500 blur-3xl" />
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
            <a href="#contact" className="inline-flex items-center justify-center rounded-lg bg-red-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-red-600/30 transition-all duration-200 hover:bg-red-500 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600">
              {dict.hero.cta}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
