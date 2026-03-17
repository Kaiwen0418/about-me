import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/home_page/HomePage";
import ProjDetailsPage from "./components/proj_page/ProjDetailsPage";
import AboutPage from "./components/AboutPage";
import NotFoundPage from "./components/NotFoundPage"; 
import "./globals.css";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<ProjDetailsPage />} />
          <Route path="/project" element={<ProjDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} /> 
        </Routes>
      </Router>
    </div>
  );
};

export default App;
