const STORE_RECORDS = "ppe_records_v1";

export function loadRecords() {
  try {
    return JSON.parse(localStorage.getItem(STORE_RECORDS)) || [];
  } catch {
    return [];
  }
}

export function saveRecords(records) {
  localStorage.setItem(STORE_RECORDS, JSON.stringify(records));
}

export function todayStr() {
  const d = new Date();
  const pad = (n) => (n < 10 ? "0" : "") + n;
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
}

export function formatDateTime(iso) {
  const d = new Date(iso);
  const pad = (n) => (n < 10 ? "0" : "") + n;
  return (
    d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) +
    " " + pad(d.getHours()) + ":" + pad(d.getMinutes())
  );
}
