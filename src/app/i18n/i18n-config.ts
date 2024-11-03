export const i18nConfig = {
    defaultLocale: "sk",
    locales: ["en", "sk"],
    defaultNS: "translation",
    cookieName: "i18next",
} as const;

export type Locale = (typeof i18nConfig)["locales"][number];
export type Namespaces = string[];
export type Options = Record<string, unknown> & { keyPrefix?: string };

export function getOptions(
    lang: Locale = i18nConfig.defaultLocale,
    ns: string[] = [i18nConfig.defaultLocale],
) {
    return {
        supportedLngs: i18nConfig.locales,
        fallbackLng: i18nConfig.defaultLocale,
        lng: lang,
        fallbackNS: i18nConfig.defaultNS,
        defaultNs: i18nConfig.defaultNS,
        ns,
    };
}
