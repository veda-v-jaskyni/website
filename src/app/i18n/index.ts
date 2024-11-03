import { Locale, Options } from "@/app/i18n/i18n-config";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import { translations } from "./locales";

const initI18Next = async (lang: Locale) => {
    const i18nInstance = createInstance();
    await i18nInstance.use(initReactI18next).init({
        lng: lang,
        debug: false,
        ns: Object.keys(translations.en),
        resources: translations,
    });

    return i18nInstance;
};

export async function useTranslation(
    lang: Locale,
    ns: string | string[],
    options: Options = {},
) {
    const i18NextInstance = await initI18Next(lang);

    return {
        t: i18NextInstance.getFixedT(
            lang,
            Array.isArray(ns) ? ns[0] : ns,
            options.keyPrefix,
        ),
        i18n: i18NextInstance,
    };
}
