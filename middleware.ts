import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { type Locale } from "@/lib/types";

const locales: Locale[] = ["en", "ka"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  const acceptLang = request.headers.get("Accept-Language");
  if (acceptLang) {
    const preferred = acceptLang
      .split(",")
      .map((lang) => lang.split(";")[0].trim().toLowerCase());
    for (const lang of preferred) {
      if (lang.startsWith("ka")) return "ka";
      if (lang.startsWith("en")) return "en";
    }
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already has a locale
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocale) return;

  // Skip static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return;
  }

  // Redirect to detected locale
  const locale = getLocale(request);
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
