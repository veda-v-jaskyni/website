import { NextRequest, NextResponse } from "next/server";
import { i18nConfig } from "./i18n-config";
import Negotiator from "negotiator";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import { ignored } from "./ignored";

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    let languages = new Negotiator({ headers: negotiatorHeaders }).languages([
        ...i18nConfig.locales,
    ]);

    const locale = matchLocale(
        languages,
        i18nConfig.locales,
        i18nConfig.defaultLocale,
    );

    return locale;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // NOTE check whether this is necessary
    if (ignored.some((i) => pathname.includes(i))) return;

    const hasKnownLocale = i18nConfig.locales.some(
        (locale) =>
            pathname.startsWith(`/${locale}`) || pathname === `/${locale}`,
    );

    if (hasKnownLocale) return;

    const locale = getLocale(request);
    return NextResponse.redirect(
        new URL(
            `${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
            request.url,
        ),
    );
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|icons).*)",
    ],
};
