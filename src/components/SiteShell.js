import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDevice } from "../utils/DeviceContext";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/project" },
  { label: "About Me", to: "/about" },
];

const SiteShell = ({
  children,
  section,
  sectionCode = "SYS.V2",
  footerLabel = "London, UK",
  footerMeta = "2026",
  fullBleed = false,
  canvasStyle,
}) => {
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

      <main
        className={`folio-canvas relative z-10 ${fullBleed ? "folio-main-bleed" : "folio-main"}`}
        style={canvasStyle}
      >
        {children}
      </main>

      <footer className={`folio-nav folio-nav-footer ${isMobileDevice ? "flex-col items-start gap-2" : ""}`}>
        <div className="flex items-center gap-4">
          <span>{footerLabel}</span>
          <span className="text-[var(--folio-muted)]">{footerMeta}</span>
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
