import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { HashRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import MainSectionsPage from "./components/MainSectionsPage";
import ProjDetailsPage from "./components/proj_page/ProjDetailsPage";
import NotFoundPage from "./components/NotFoundPage"; 
import RouteLoadingScreen from "./components/RouteLoadingScreen";
import SiteShell from "./components/SiteShell";
import { uiText } from "./data/translations";
import { LanguageProvider, useLanguage } from "./utils/LanguageContext";
import "./globals.css";

const getShellConfig = (pathname, language) => {
  const text = uiText[language].shell;

  if (pathname.startsWith("/project/")) {
    const id = pathname.split("/")[2] || "00";

    return {
      section: text.projectFile,
      sectionCode: `SYS.V2 LOG_0${id}`,
      footerLabel: text.location,
      footerMeta: "2026",
      fullBleed: false,
    };
  }

  if (pathname.startsWith("/project")) {
    return {
      section: text.archive,
      sectionCode: "SYS.V2 ARCHIVE",
      footerLabel: text.location,
      footerMeta: "",
      fullBleed: true,
    };
  }

  if (pathname.startsWith("/about")) {
    return {
      section: text.about,
      sectionCode: "Sys.v1.0",
      footerLabel: text.indexAbout,
      footerMeta: "",
      fullBleed: true,
    };
  }

  if (pathname === "/") {
    return {
      section: text.home,
      sectionCode: "Sys.v1.0",
      footerLabel: text.indexHome,
      footerMeta: "",
      fullBleed: true,
    };
  }

  return {
    section: text.missing,
    sectionCode: "SYS.V2 404",
    footerLabel: text.location,
    footerMeta: "2026",
    fullBleed: false,
  };
};

const RoutedApp = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [coverChrome, setCoverChrome] = useState(true);
  const hasMountedRef = useRef(false);
  const shellConfig = useMemo(() => getShellConfig(location.pathname, language), [language, location.pathname]);
  const skipLoader = Boolean(location.state && location.state.skipLoader);

  useLayoutEffect(() => {
    if (skipLoader) {
      setLoading(false);
      setCoverChrome(false);
      return undefined;
    }

    setLoading(true);

    if (!hasMountedRef.current) {
      setCoverChrome(true);
      hasMountedRef.current = true;
    } else {
      setCoverChrome(false);
    }

    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => window.clearTimeout(timer);
  }, [location.pathname, skipLoader]);

  return (
    <>
      <RouteLoadingScreen visible={loading} routePath={location.pathname} coverChrome={coverChrome} />
      <SiteShell {...shellConfig}>
        <Routes>
          <Route path="/" element={<MainSectionsPage />} />
          <Route path="/project" element={<MainSectionsPage />} />
          <Route path="/about" element={<MainSectionsPage />} />
          <Route path="/project/:id" element={<ProjDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} /> 
        </Routes>
      </SiteShell>
    </>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <div>
        <Router>
          <RoutedApp />
        </Router>
      </div>
    </LanguageProvider>
  );
};

export default App;
