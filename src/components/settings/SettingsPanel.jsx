import { useTranslation } from "react-i18next";
import PreferenceControls from "./PreferenceControls";

function SettingsPanel() {
  const { t } = useTranslation();

  return (
      <PreferenceControls />
  );
}

export default SettingsPanel;
