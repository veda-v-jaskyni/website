import { Locale } from "@/app/i18n/i18n-config";

export type DefaultServerComponentProps<
    T extends Record<string, unknown> = {},
> = Readonly<
    {
        params: Promise<{ lang: Locale }>;
    } & T
>;
