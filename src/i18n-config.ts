export const i18nConfig = {
    defaultLocale: "sk",
    locales: ["en", "sk"],
} as const;

export type Locale = (typeof i18nConfig)["locales"][number];
