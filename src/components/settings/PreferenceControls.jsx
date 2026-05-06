import { useTranslation } from "react-i18next";
import { supportedLanguages, useSettings } from "../../context/SettingsContext";
import { Listbox } from "@headlessui/react";
const themeOptions = ["light", "dark"];

function PreferenceControls({ compact = false, onChange }) {
  const { t } = useTranslation();
  const { state, setTheme, setLanguage } = useSettings();

  function handleThemeChange(theme) {
    setTheme(theme);
    onChange?.();
  }

  function handleLanguageChange(event) {
    setLanguage(event.target.value);
    onChange?.();
  }

  const groupClass = compact
    ? "flex flex-col gap-2 sm:flex-row sm:items-center"
    : "grid gap-3 rounded-lg border border-stone-200 bg-white/70 p-4 dark:border-stone-700 dark:bg-stone-900/50";

  return (
    <div className={compact ? "flex flex-col gap-3 md:flex-row md:items-center" : "grid gap-4 md:grid-cols-2"}>
      <section
        className={groupClass}
        aria-label={compact ? t("settings.theme") : undefined}
        aria-labelledby={compact ? undefined : "theme-control-title"}
      >
        {!compact && (
          <div>
            <h2 id="theme-control-title" className="text-lg font-bold text-stone-950 dark:text-stone-50">
              {t("settings.appearance")}
            </h2>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">
              {t("settings.themeHint")}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold text-stone-700 dark:text-stone-200">
            {t("settings.theme")}
          </span>
          <div className="inline-flex rounded-lg border border-stone-200 bg-stone-100 p-1 dark:border-stone-700 dark:bg-stone-950">
            {themeOptions.map((theme) => (
              <button
                key={theme}
                type="button"
                aria-pressed={state.theme === theme}
                className={`rounded-md px-3 py-2 text-sm font-bold transition ${
                  state.theme === theme
                    ? "bg-emerald-700 text-white"
                    : "bg-transparent text-stone-600 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white"
                }`}
                onClick={() => handleThemeChange(theme)}
              >
                {t(`settings.${theme}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section
        className={groupClass}
        aria-label={compact ? t("settings.language") : undefined}
        aria-labelledby={compact ? undefined : "language-control-title"}
      >
        {!compact && (
          <div>
            <h2 id="language-control-title" className="text-lg font-bold text-stone-950 dark:text-stone-50">
              {t("settings.localization")}
            </h2>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">
              {t("settings.languageHint")}
            </p>
          </div>
        )}

     <label className="flex w-full flex-col gap-3">
  <span className="text-sm font-bold text-stone-700 dark:text-stone-200">
    {t("settings.language")}
  </span>

  <Listbox
    value={state.language}
    onChange={(value) => {
      setLanguage(value);
      onChange?.();
    }}
  >
<div className="relative w-full sm:w-56">
      {/* Trigger Button */}
      <Listbox.Button
        className="
          flex
         w-full min-w-[14rem]
          items-center
          justify-between
          rounded-xl
          border
          border-stone-200
          bg-white
          px-4
          py-3
          text-left
          text-base
          font-bold
          text-stone-900
          shadow-sm
          transition
          focus:outline-none
          focus:ring-2
          focus:ring-emerald-700/20
          dark:border-stone-700
          dark:bg-stone-950
          dark:text-stone-50
        "
      >
        <span>
          {t(
            supportedLanguages.find(
              (language) =>
                language.code === state.language
            )?.labelKey
          )}
        </span>

        <span className="text-sm opacity-60">
          ▼
        </span>
      </Listbox.Button>

      {/* Dropdown */}
      <Listbox.Options
        className="
          absolute
          z-50
          mt-2
          max-h-72
          w-full
          overflow-auto
          rounded-xl
          border
          border-stone-200
          bg-white
          p-2
          shadow-xl
          focus:outline-none
          dark:border-stone-700
          dark:bg-stone-900
          backdrop-blur-xl
          ring-1
          ring-black/5
        "
      >
        {supportedLanguages.map(
          (language) => (
            <Listbox.Option
              key={language.code}
              value={language.code}
              className={({ active }) =>
                `
                  cursor-pointer
                  rounded-lg
                  px-4
                  py-3
                  text-base
                  font-semibold
                  transition
                  ${
                    active
                      ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100"
                      : "text-stone-800 dark:text-stone-100"
                  }
                `
              }
            >
              {({ selected }) => (
                <div className="flex items-center justify-between">
                  <span>
                    {t(language.labelKey)}
                  </span>

                  {selected && (
                    <span className="text-emerald-700 dark:text-emerald-400">
                      ✓
                    </span>
                  )}
                </div>
              )}
            </Listbox.Option>
          )
        )}
      </Listbox.Options>
    </div>
  </Listbox>
</label>
      </section>
    </div>
  );
}

export default PreferenceControls;
