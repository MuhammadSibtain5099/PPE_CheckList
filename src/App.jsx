import { useEffect, useState } from "react";
import { LangProvider } from "./i18n.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import TradePage from "./pages/TradePage.jsx";
import SummaryPage from "./pages/SummaryPage.jsx";
import RecordsPage from "./pages/RecordsPage.jsx";

/* 해시 라우팅 (#/trade/rebar 등) — 기존 정적 사이트와 동일한 URL 형식 */
function useHashRoute() {
  const [hash, setHash] = useState(() => location.hash || "#/");

  useEffect(() => {
    const onChange = () => {
      const h = location.hash || "#/";
      /* "#trades" 같은 페이지 내 앵커는 라우팅하지 않음 (브라우저 기본 스크롤 유지) */
      if (h === "#/" || h.startsWith("#/")) {
        setHash(h);
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return hash;
}

export default function App() {
  const hash = useHashRoute();

  /* 공종별 점검 세션 — 사이드바로 공종을 오가도 체크 상태가 유지됩니다 */
  const [sessions, setSessions] = useState({});

  let view = "home";
  let page;
  const m = hash.match(/^#\/trade\/([\w-]+)/);
  if (m) {
    page = <TradePage id={m[1]} sessions={sessions} setSessions={setSessions} />;
  } else if (hash.startsWith("#/summary")) {
    view = "summary";
    page = <SummaryPage />;
  } else if (hash.startsWith("#/records")) {
    view = "records";
    page = <RecordsPage />;
  } else {
    page = <Home />;
  }

  return (
    <LangProvider>
      <Header view={view} />
      <main id="app">{page}</main>
      <Footer />
    </LangProvider>
  );
}
