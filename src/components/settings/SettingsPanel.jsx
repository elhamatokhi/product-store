import { languages, useSettings } from "../../context/SettingsContext";

function SettingsPanel() {
  const { state, dispatch, activeLanguage } = useSettings();

  return (
    <section className="settings-panel" aria-label="Settings">
      <div className="settings-panel__header">
        <span className="eyebrow">Settings</span>
        <strong>{activeLanguage.label}</strong>
      </div>

      <div className="setting-group">
        <span>Theme</span>
        <div className="segmented-control" role="group" aria-label="Theme">
          <button
            type="button"
            className={state.theme === "light" ? "is-active" : ""}
            onClick={() => dispatch({ type: "SET_THEME", payload: "light" })}
          >
            Light
          </button>
          <button
            type="button"
            className={state.theme === "dark" ? "is-active" : ""}
            onClick={() => dispatch({ type: "SET_THEME", payload: "dark" })}
          >
            Dark
          </button>
        </div>
      </div>

      <label className="setting-group">
        <span>Language</span>
        <select
          value={state.language}
          onChange={(event) =>
            dispatch({ type: "SET_LANGUAGE", payload: event.target.value })
          }
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.label}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}

export default SettingsPanel;
