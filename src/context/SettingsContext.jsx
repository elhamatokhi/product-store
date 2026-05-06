import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import i18n from "../locales/i18n";
import { getLanguageMeta, supportedLanguages } from "../locales/languages";

/* eslint-disable react-refresh/only-export-components */

const SettingsContext = createContext(null);

const initialState = {
  theme: "light",
  view: "grid",
  category: "all",
  language: "en",
};

function settingsReducer(state, action) {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    case "SET_VIEW":
      return { ...state, view: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_LANGUAGE":
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
}

export { supportedLanguages };

export function SettingsProvider({ children }) {
  const [state, dispatch] = useReducer(settingsReducer, initialState);
  const activeLanguage = getLanguageMeta(state.language);

  useEffect(() => {
    const root = document.documentElement;

    root.dataset.theme = state.theme;
    root.classList.toggle("dark", state.theme === "dark");
    root.lang = activeLanguage.code;
    root.dir = activeLanguage.dir;

    // Keep Context API preferences as the source of truth while i18next handles translation lookup.
    i18n.changeLanguage(activeLanguage.code);
  }, [activeLanguage, state.theme]);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      activeLanguage,
      setTheme: (theme) => dispatch({ type: "SET_THEME", payload: theme }),
      setLanguage: (language) =>
        dispatch({ type: "SET_LANGUAGE", payload: language }),
    }),
    [activeLanguage, state],
  );

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettings must be used inside SettingsProvider");
  }

  return context;
}
