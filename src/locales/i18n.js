import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en/translation.json";
import fa from "./fa/translation.json";
import ps from './ps/translation.json'
import de from './de/translation.json'

export const resources = {
  en: { translation: en },
  fa: { translation: fa },
  ps: {translation: ps},
  de: {translation: de}
};

// i18next is initialized once before React renders so hooks can read translations immediately.
i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
