import { createContext, useContext, useEffect, useReducer } from "react";

/* eslint-disable react-refresh/only-export-components */

const SettingsContext = createContext();

export const languages = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "fa", label: "Persian", dir: "rtl" },
  { code: "ps", label: "Pashto", dir: "rtl" },
  { code: "de", label: "Deutsch", dir: "ltr" },
];

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

export function SettingsProvider({ children }) {
  const [state, dispatch] = useReducer(settingsReducer, initialState);
  const activeLanguage =
    languages.find((language) => language.code === state.language) ?? languages[0];

  useEffect(() => {
    document.documentElement.dataset.theme = state.theme;
    document.documentElement.lang = activeLanguage.code;
    document.documentElement.dir = activeLanguage.dir;
  }, [activeLanguage, state.theme]);

  return (
    <SettingsContext.Provider value={{ state, dispatch, activeLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
