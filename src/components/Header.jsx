import { useLang } from "../i18n.jsx";

export default function Header({ view }) {
  const { lang, setLang, t } = useLang();

  return (
    <header className="site-header">
      <a className="brand" href="#/">
        <span className="brand-mark" aria-hidden="true"></span>
        <span className="brand-text">
          <strong>{t("brand")}</strong>
          <small>{t("brandSub")}</small>
        </span>
      </a>
      <nav className="site-nav" aria-label="주 메뉴">
        <a href="#/" className={view === "home" ? "active" : ""}>{t("navTrades")}</a>
        <a href="#/summary" className={view === "summary" ? "active" : ""}>{t("navSummary")}</a>
        <a href="#/records" className={view === "records" ? "active" : ""}>{t("navRecords")}</a>
      </nav>
      <div className="lang-toggle" role="group" aria-label="Language">
        <button type="button" aria-pressed={lang === "ko"} onClick={() => setLang("ko")}>KO</button>
        <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
      </div>
    </header>
  );
}
