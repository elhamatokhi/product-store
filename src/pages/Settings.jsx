import { useTranslation } from "react-i18next";
import SettingsPanel from "../components/settings/SettingsPanel";
import { useNavigate } from "react-router-dom";

function Settings() {
  const { t } = useTranslation();
const navigate = useNavigate()

  return (
    <section>
     <button   type="button"
      onClick={() => navigate(-1)}>
      Go back
    </button>
      <div className="page-hero">
        <span className="eyebrow">{t("settings.eyebrow")}</span>
        <h1>{t("settings.title")}</h1>
        <p>{t("settings.intro")}</p>
      </div>

      <SettingsPanel />
    </section>
  );
}

export default Settings;
