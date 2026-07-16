import data from "../data.js";
import { useLang } from "../i18n.jsx";
import { loadRecords, saveRecords, todayStr } from "../storage.js";

const freshSession = () => ({ checked: {}, worker: "", completed: false });

export default function TradePage({ id, sessions, setSessions }) {
  const { lang, t, loc } = useLang();
  const trade = data.trades.find((tr) => tr.id === id);

  if (!trade) {
    return (
      <section className="detail">
        <p className="empty">{t("notFound")}</p>
        <p><a className="btn btn-ghost" href="#/">← {t("backLink")}</a></p>
      </section>
    );
  }

  const session = sessions[id] || freshSession();
  const patch = (p) =>
    setSessions((s) => ({ ...s, [id]: { ...(s[id] || freshSession()), ...p } }));

  const items = trade.ppe.map((p) => ({ ...data.ppeCatalog[p.id], ...p }));
  const required = items.filter((i) => i.level === "required");
  const done = required.filter((i) => session.checked[i.id]).length;
  const total = required.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const canComplete = !session.completed && done === total;

  const toggle = (itemId) => {
    if (session.completed) return;
    patch({ checked: { ...session.checked, [itemId]: !session.checked[itemId] } });
  };

  const complete = () => {
    const checkedIds = items.filter((i) => session.checked[i.id]).map((i) => i.id);
    const record = {
      id: "chk_" + Date.now(),
      ts: new Date().toISOString(),
      tradeId: trade.id,
      trade: { ko: trade.name.ko, en: trade.name.en },
      worker: session.worker.trim(),
      checkedItems: checkedIds,
      /* 향후 AI 모델 학습·검증용 클래스 라벨 */
      checkedAiLabels: checkedIds.map((cid) => data.ppeCatalog[cid].aiLabel),
      requiredDone: done,
      requiredTotal: total,
      itemsTotal: items.length
    };
    saveRecords([record, ...loadRecords()]);
    patch({ completed: true });
  };

  return (
    <section className="detail">
      <div className="detail-top no-print">
        <a className="back-link" href="#/">← {t("backLink")}</a>
        <button type="button" className="btn btn-ghost" onClick={() => window.print()}>
          🖨 {t("printBtn")}
        </button>
      </div>

      <div className="trade-layout">
        <nav className="trade-sidebar no-print" aria-label={t("navTrades")}>
          {data.trades.map((tr) => (
            <a
              key={tr.id}
              className={"side-item" + (tr.id === id ? " active" : "")}
              aria-current={tr.id === id ? "page" : undefined}
              href={"#/trade/" + tr.id}
            >
              <span
                className={"side-plate" + (lang === "en" ? " plate-en" : "")}
                aria-hidden="true"
              >
                {lang === "en" ? tr.plateEn : tr.plate}
              </span>
              <span className="side-name">{loc(tr.name)}</span>
            </a>
          ))}
        </nav>

        <div className="trade-main">
          <header className="detail-head">
            <span
              className={"trade-plate plate-lg" + (lang === "en" ? " plate-en" : "")}
              aria-hidden="true"
            >
              {lang === "en" ? trade.plateEn : trade.plate}
            </span>
            <div>
              <h1>{loc(trade.name)}</h1>
            </div>
          </header>

          <div className="detail-grid">
            <div className="detail-info">
              <h2 className="block-title">{t("hazardsTitle")}</h2>
              <ul className="hazard-list">
                {trade.hazards.map((h, i) => (
                  <li key={i} className="hazard-chip">{loc(h)}</li>
                ))}
              </ul>

              <h2 className="block-title">{t("talkTitle")}</h2>
              <p className="block-sub">{t("talkSub")}</p>
              <ul className="talk-list">
                {trade.talk.map((q, i) => (
                  <li key={i}>
                    <span className="talk-q" aria-hidden="true">Q</span>
                    <p>{loc(q)}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="checklist-card">
              <div className="checklist-head">
                <h2>{t("checklistTitle")}</h2>
                <span className="check-date">{t("dateLabel")} · {todayStr()}</span>
              </div>

              <input
                type="text"
                className="worker-input"
                placeholder={t("workerPlaceholder")}
                value={session.worker}
                disabled={session.completed}
                onChange={(e) => patch({ worker: e.target.value })}
              />

              <ul className="check-list">
                {items.map((item) => (
                  <li key={item.id} className={"check-item level-" + item.level}>
                    <label>
                      <input
                        type="checkbox"
                        checked={!!session.checked[item.id]}
                        disabled={session.completed}
                        onChange={() => toggle(item.id)}
                      />
                      <span className="check-box" aria-hidden="true"></span>
                      <span className={"item-cat cat-" + item.cat}>
                        {loc(data.categories[item.cat])}
                      </span>
                      <span className="item-text">
                        <strong>{loc(item.name)}</strong>
                        <small>{loc(item.desc)}</small>
                        {item.note && <span className="item-note">{loc(item.note)}</span>}
                      </span>
                      <span className="item-level">
                        {t(item.level === "required" ? "requiredBadge" : "conditionalBadge")}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>

              <div className="checklist-foot no-print">
                <div className="progress-wrap">
                  <div className="progress-bar">
                    <span
                      className={done === total ? "full" : ""}
                      style={{ width: pct + "%" }}
                    ></span>
                  </div>
                  <span className="progress-label">
                    {t("progressLabel", { done, total })}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn-complete"
                  disabled={!canComplete}
                  onClick={complete}
                >
                  {t("completeBtn")}
                </button>
                <p
                  className="complete-hint"
                  style={{ visibility: !canComplete && !session.completed ? "visible" : "hidden" }}
                >
                  {t("completeLocked")}
                </p>
              </div>

              <div className="sign-line print-only">
                <span>{t("signLine")}</span>
                <span className="sign-rule"></span>
              </div>

              {session.completed && (
                <div className="stamp-layer" role="status">
                  <div className="stamp">{t("completedStamp")}</div>
                  <p className="stamp-note">{t("savedNote")}</p>
                  <button
                    type="button"
                    className="btn btn-yellow"
                    onClick={() => setSessions((s) => ({ ...s, [id]: freshSession() }))}
                  >
                    {t("newCheckBtn")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
