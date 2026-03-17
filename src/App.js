import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { HashRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import MainSectionsPage from "./components/MainSectionsPage";
import ProjDetailsPage from "./components/proj_page/ProjDetailsPage";
import NotFoundPage from "./components/NotFoundPage"; 
import RouteLoadingScreen from "./components/RouteLoadingScreen";
import SiteShell from "./components/SiteShell";
import "./globals.css";

const getShellConfig = (pathname) => {
  if (pathname.startsWith("/project/")) {
    const id = pathname.split("/")[2] || "00";

    return {
      section: "Project File",
      sectionCode: `SYS.V2 LOG_0${id}`,
      footerLabel: "London, UK",
      footerMeta: "2026",
      fullBleed: false,
    };
  }

  if (pathname.startsWith("/project")) {
    return {
      section: "Projects",
      sectionCode: "SYS.V2 ARCHIVE",
      footerLabel: "London, UK",
      footerMeta: "",
      fullBleed: true,
    };
  }

  if (pathname.startsWith("/about")) {
    return {
      section: "About Me",
      sectionCode: "Sys.v1.0",
      footerLabel: "Index: KL-ABOUT",
      footerMeta: "",
      fullBleed: true,
    };
  }

  if (pathname === "/") {
    return {
      section: "Home",
      sectionCode: "Sys.v1.0",
      footerLabel: "Index: KL-2024",
      footerMeta: "",
      fullBleed: true,
    };
  }

  return {
    section: "Missing",
    sectionCode: "SYS.V2 404",
    footerLabel: "London, UK",
    footerMeta: "2026",
    fullBleed: false,
  };
};

const RoutedApp = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [coverChrome, setCoverChrome] = useState(true);
  const hasMountedRef = useRef(false);
  const shellConfig = useMemo(() => getShellConfig(location.pathname), [location.pathname]);
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
    <div>
      <Router>
        <RoutedApp />
      </Router>
    </div>
  );
};

export default App;
