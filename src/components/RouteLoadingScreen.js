import React from "react";

const RouteLoadingScreen = ({ visible }) => {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#090909]/92 transition-opacity duration-300"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
      aria-hidden={!visible}
    >
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center gap-4 text-[0.75rem] uppercase tracking-[0.28em] text-[var(--folio-fg)]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--folio-fg)]" />
          <span>Loading</span>
        </div>
        <div className="w-52 overflow-hidden border border-[var(--folio-line)]">
          <div className="h-1.5 w-full origin-left animate-[route-loader_0.7s_ease-in-out_infinite] bg-[var(--folio-fg)]" />
        </div>
      </div>
    </div>
  );
};

export default RouteLoadingScreen;
