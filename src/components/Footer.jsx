import { useLang } from "../i18n.jsx";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="site-footer">
      <p>{t("footNote")}</p>
      <p className="foot-ai">{t("footAi")}</p>
    </footer>
  );
}
