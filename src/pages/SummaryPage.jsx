import data from "../data.js";
import { useLang } from "../i18n.jsx";

export default function SummaryPage() {
  const { t, loc } = useLang();

  /* tradeId → { itemId: ppe항목 } */
  const mat = {};
  data.trades.forEach((tr) => {
    mat[tr.id] = {};
    tr.ppe.forEach((p) => { mat[tr.id][p.id] = p; });
  });

  return (
    <section className="summary">
      <h1 className="section-title">{t("summaryTitle")}</h1>
      <p className="section-sub">{t("summarySub")}</p>
      <p className="summary-legend">
        <span className="req">●</span> {t("requiredBadge")}
        {"   "}
        <span className="cond">○</span> {t("conditionalBadge")}
      </p>

      <div className="summary-wrap">
        <table className="summary-table">
          <thead>
            <tr>
              <th className="sum-item sum-corner" scope="col">{t("colPpeItem")}</th>
              {data.trades.map((tr) => (
                <th key={tr.id} className="sum-trade" scope="col">
                  <a href={"#/trade/" + tr.id}><span>{loc(tr.name)}</span></a>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(data.ppeCatalog).map((iid) => {
              const item = data.ppeCatalog[iid];
              return (
                <tr key={iid}>
                  <th className="sum-item" scope="row">
                    <span className={"item-cat cat-" + item.cat}>
                      {loc(data.categories[item.cat])}
                    </span>
                    <span>{loc(item.name)}</span>
                  </th>
                  {data.trades.map((tr) => {
                    const p = mat[tr.id][iid];
                    if (!p) return <td key={tr.id} className="sum-cell"></td>;
                    const required = p.level === "required";
                    const tip =
                      loc(tr.name) + " — " + loc(item.name) + " (" +
                      t(required ? "requiredBadge" : "conditionalBadge") +
                      (p.note ? ": " + loc(p.note) : "") + ")";
                    return (
                      <td
                        key={tr.id}
                        className={"sum-cell " + (required ? "req" : "cond")}
                        title={tip}
                      >
                        {required ? "●" : "○"}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th className="sum-item">{t("sumTotals")}</th>
              {data.trades.map((tr) => {
                const r = tr.ppe.filter((p) => p.level === "required").length;
                const c = tr.ppe.length - r;
                return <td key={tr.id} className="sum-total">●{r} ○{c}</td>;
              })}
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
