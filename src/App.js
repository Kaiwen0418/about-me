import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./components/home_page/HomePage";
import ProjDetailsPage from "./components/proj_page/ProjDetailsPage";
import AboutPage from "./components/AboutPage";
import NotFoundPage from "./components/NotFoundPage"; 
import RouteLoadingScreen from "./components/RouteLoadingScreen";
import "./globals.css";

const RoutedApp = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 420);

    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <RouteLoadingScreen visible={loading} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjDetailsPage />} />
        <Route path="/project" element={<ProjDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} /> 
      </Routes>
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
