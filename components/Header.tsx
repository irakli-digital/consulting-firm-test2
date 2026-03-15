"use client";

import { useState, useEffect } from "react";
import type { Locale, Dictionary } from "@/lib/types";
import LanguageToggle from "./LanguageToggle";

export default function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#services", label: dict.nav.services },
    { href: "#how-it-works", label: dict.nav.howItWorks },
    { href: "#guides", label: dict.nav.guides },
    { href: "#testimonials", label: dict.nav.testimonials },
    { href: "#faq", label: dict.nav.faq },
    { href: "#contact", label: dict.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href={`/${lang}`} className="text-2xl font-bold text-navy">
          Geo<span className="text-teal">Permit</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-teal"
            >
              {item.label}
            </a>
          ))}
          <LanguageToggle lang={lang} />
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 lg:hidden">
          <LanguageToggle lang={lang} />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-navy"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <div className="space-y-1 px-4 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-4 py-3 text-base font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-teal"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
