import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

/**
 * Locale routing:
 *  - "/"  and "/anything"       -> internally rewritten to "/pt/..."
 *  - "/en" and "/en/anything"   -> served as is
 *  - "/pt/..."                  -> redirected to "/..." (see next.config redirects)
 * A visitor with an English browser arriving at "/" is offered /en once via cookie.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  const preferred = request.cookies.get("locale")?.value;
  if (!preferred && pathname === "/") {
    const accept = request.headers.get("accept-language") ?? "";
    const firstLang = accept.split(",")[0]?.trim().toLowerCase() ?? "";
    if (firstLang.startsWith("en")) {
      const url = request.nextUrl.clone();
      url.pathname = "/en";
      const res = NextResponse.redirect(url);
      res.cookies.set("locale", "en", { path: "/", maxAge: 60 * 60 * 24 * 365 });
      return res;
    }
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next|assets|icon.png|apple-icon.png|robots.txt|sitemap.xml|.*\\..*).*)"],
};
