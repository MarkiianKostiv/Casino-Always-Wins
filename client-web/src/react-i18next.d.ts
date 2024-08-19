import "react-i18next";
import translation_en from "../public/locales/en/translation.json";
import translation_uk from "../public/locales/uk/translation.json";

declare module "react-i18next" {
  interface Resources {
    en: typeof translation_en;
    uk: typeof translation_uk;
  }
}
