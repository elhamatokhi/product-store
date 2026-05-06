export const supportedLanguages = [
  {
    code: "en",
    labelKey: "languages.english",
    dir: "ltr",
  },

  {
    code: "fa",
    labelKey: "languages.persian",
    dir: "rtl",
  },

  {
    code: "ps",
    labelKey: "languages.pashto",
    dir: "rtl",
  },

  {
    code: "de",
    labelKey: "languages.german",
    dir: "ltr",
  },
];

export function getLanguageMeta(languageCode) {
  return (
    supportedLanguages.find(
      (language) =>
        language.code === languageCode
    ) ?? supportedLanguages[0]
  );
}