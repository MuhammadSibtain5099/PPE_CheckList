import data from "../data.js";
import { useLang } from "../i18n.jsx";

export default function Home() {
  const { lang, t, loc } = useLang();

  return (
    <>
      <section className="hero">
        <div className="hero-stripe" aria-hidden="true"></div>
        <div className="hero-inner">
          <div className="hero-stamp" aria-hidden="true">
            <span>{t("safetyFirst")}</span>
          </div>
          <p className="hero-kicker">{t("heroKicker")}</p>
          <h1 className="hero-title">
            {t("heroTitleA")}
            <br />
            <em>{t("heroTitleB")}</em>
          </h1>
          <p className="hero-sub">{t("heroSub")}</p>
          <div className="hero-actions">
            <a className="btn btn-yellow" href="#trades">{t("heroCta")}</a>
            <a className="hero-link" href="#/summary">{t("heroSummaryLink")} →</a>
            <span className="hero-stat">
              {t("heroStat", {
                trades: data.trades.length,
                items: Object.keys(data.ppeCatalog).length
              })}
            </span>
          </div>
        </div>
      </section>

      <section className="trades" id="trades">
        <h2 className="section-title">{t("tradesTitle")}</h2>
        <p className="section-sub">{t("tradesSub")}</p>
        <div className="trade-grid">
          {data.trades.map((trade) => {
            const req = trade.ppe.filter((p) => p.level === "required").length;
            const cond = trade.ppe.length - req;
            return (
              <a key={trade.id} className="trade-card" href={"#/trade/" + trade.id}>
                <span
                  className={"trade-plate" + (lang === "en" ? " plate-en" : "")}
                  aria-hidden="true"
                >
                  {lang === "en" ? trade.plateEn : trade.plate}
                </span>
                <span className="trade-card-body">
                  <strong>{loc(trade.name)}</strong>
                  <span className="trade-count">{t("cardCount", { r: req, c: cond })}</span>
                </span>
                <span className="trade-arrow" aria-hidden="true">→</span>
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}
