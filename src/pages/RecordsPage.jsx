import { useState } from "react";
import { useLang } from "../i18n.jsx";
import { loadRecords, saveRecords, todayStr, formatDateTime } from "../storage.js";

export default function RecordsPage() {
  const { lang, t } = useLang();
  const [records, setRecords] = useState(loadRecords);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(records, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "ppe-records-" + todayStr() + ".json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  };

  const clearAll = () => {
    if (window.confirm(t("clearConfirm"))) {
      saveRecords([]);
      setRecords([]);
    }
  };

  return (
    <section className="records">
      <h1 className="section-title">{t("recordsTitle")}</h1>
      <p className="section-sub">{t("recordsSub")}</p>

      {records.length === 0 ? (
        <p className="empty">{t("emptyRecords")}</p>
      ) : (
        <>
          <div className="table-wrap">
            <table className="records-table">
              <thead>
                <tr>
                  <th>{t("colTime")}</th>
                  <th>{t("colTrade")}</th>
                  <th>{t("colWorker")}</th>
                  <th>{t("colItems")}</th>
                  <th>{t("colStatus")}</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r.id}>
                    <td className="mono">{formatDateTime(r.ts)}</td>
                    <td>{r.trade ? r.trade[lang] : r.tradeId}</td>
                    <td>{r.worker || "—"}</td>
                    <td className="mono">{r.checkedItems.length} / {r.itemsTotal}</td>
                    <td><span className="status-done">{t("statusDone")}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="records-actions">
            <button type="button" className="btn btn-yellow" onClick={exportJson}>
              {t("exportBtn")}
            </button>
            <button type="button" className="btn btn-ghost" onClick={clearAll}>
              {t("clearBtn")}
            </button>
          </div>
        </>
      )}
    </section>
  );
}
