import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDevice } from "../utils/DeviceContext";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/project" },
  { label: "About", to: "/about" },
];

const SiteShell = ({ children, section, sectionCode = "SYS.V2" }) => {
  const location = useLocation();
  const isMobileDevice = useDevice();

  const isActive = (to) => {
    if (to === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(to);
  };

  return (
    <div className="folio-shell min-h-screen text-[var(--folio-fg)]">
      <div className="folio-noise" />
      <div className="folio-vline" />
      <div className="folio-scanline" />

      <header className="folio-nav folio-nav-left">
        <span>{sectionCode}</span>
        <span className="text-[var(--folio-muted)]">{"/"}</span>
        <span>{section}</span>
      </header>

      <nav className={`folio-nav folio-nav-right ${isMobileDevice ? "gap-4" : "gap-8"}`}>
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`folio-link ${isActive(item.to) ? "folio-link-active" : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <main className="relative z-10 px-6 pb-24 pt-24 md:px-10 md:pb-28 md:pt-28">
        {children}
      </main>

      <footer className={`folio-nav folio-nav-footer ${isMobileDevice ? "flex-col items-start gap-2" : ""}`}>
        <div className="flex items-center gap-4">
          <span>London, UK</span>
          <span className="text-[var(--folio-muted)]">2026</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/Kaiwen0418" target="_blank" rel="noreferrer" className="folio-link">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/kaiwen-liu-5237911b9/" target="_blank" rel="noreferrer" className="folio-link">
            LinkedIn
          </a>
          <a href="mailto:kaiwenliu0418@gmail.com" className="folio-link">
            Email
          </a>
        </div>
      </footer>
    </div>
  );
};

export default SiteShell;
