import { createContext, useContext, useEffect, useState } from "react";
import data from "./data.js";

const STORE_LANG = "ppe_lang";
const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    /* URL로 언어 지정 가능: ?lang=en (공유용 링크) */
    const urlLang = new URLSearchParams(location.search).get("lang");
    if (urlLang === "en" || urlLang === "ko") {
      localStorage.setItem(STORE_LANG, urlLang);
      return urlLang;
    }
    return localStorage.getItem(STORE_LANG) === "en" ? "en" : "ko";
  });

  const setLang = (next) => {
    localStorage.setItem(STORE_LANG, next);
    setLangState(next);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title =
      lang === "ko"
        ? "PPE 체크리스트 by Contil Lab — 공종별 보호구 점검"
        : "PPE Check List by Contil Lab";
  }, [lang]);

  /* UI 문자열 조회: t("progressLabel", { done: 2, total: 5 }) */
  const t = (key, vars) => {
    const entry = data.i18n[key];
    let s = entry ? entry[lang] : key;
    if (vars) {
      Object.keys(vars).forEach((k) => {
        s = s.replace("{" + k + "}", vars[k]);
      });
    }
    return s;
  };

  /* 데이터 필드 조회: loc(trade.name) → 현재 언어의 값 */
  const loc = (field) => (field ? field[lang] : "");

  return (
    <LangContext.Provider value={{ lang, setLang, t, loc }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
