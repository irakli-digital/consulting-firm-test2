"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/types";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl font-bold text-teal sm:text-5xl">
      {count}{suffix}
    </div>
  );
}

export default function TrustBar({ dict }: { dict: Dictionary }) {
  const stats = [
    { target: 500, suffix: "+", label: dict.trustBar.clients },
    { target: 10, suffix: "+", label: dict.trustBar.years },
    { target: 98, suffix: "%", label: dict.trustBar.successRate },
  ];

  return (
    <section className="border-y border-slate-100 bg-white py-12">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 text-center sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label}>
            <AnimatedCounter target={stat.target} suffix={stat.suffix} />
            <p className="mt-2 text-sm font-medium uppercase tracking-wider text-slate-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
