"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/types";

export default function LanguageToggle({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    const newPath = pathname.replace(`/${lang}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1">
      <button
        onClick={() => switchLocale("en")}
        className={`rounded-full px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-teal/50 ${
          lang === "en"
            ? "bg-white text-navy shadow-sm"
            : "text-slate-500 hover:text-navy"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => switchLocale("ka")}
        className={`rounded-full px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-teal/50 ${
          lang === "ka"
            ? "bg-white text-navy shadow-sm"
            : "text-slate-500 hover:text-navy"
        }`}
        aria-label="ქართულზე გადართვა"
      >
        GE
      </button>
    </div>
  );
}
