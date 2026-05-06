import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
       <div>
        © {new Date().getFullYear()} {t("app.brand")}. {t("app.footer")}
      </div>
    </footer>
  );
}

export default Footer;
