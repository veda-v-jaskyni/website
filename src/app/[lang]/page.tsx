import { DefaultServerComponentProps } from "../utils/types";
import { useTranslation } from "../i18n";

export default async function Home({ params }: DefaultServerComponentProps) {
  const { lang } = await params;
  const { t } = await useTranslation(lang, "home");

  return <h1>{t("hello")}</h1>;
}
