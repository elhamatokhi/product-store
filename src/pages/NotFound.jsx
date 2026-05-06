import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NotFound() {
  const { t } = useTranslation();

  return (
    <section className="not-found">
      <h1>{t("emptyStates.pageNotFound")}</h1>
      <p>{t("emptyStates.notFoundText")}</p>
      <Link to="/">{t("buttons.returnHome")}</Link>
    </section>
  );
}

export default NotFound;
