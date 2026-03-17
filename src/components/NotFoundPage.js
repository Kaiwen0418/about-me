import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center text-center">
      <p className="mb-4 text-[0.72rem] uppercase tracking-[0.22em] text-[var(--folio-muted)]">
        Requested file unavailable
      </p>
      <h1 className="folio-display text-[clamp(4rem,12vw,8rem)] leading-none">404</h1>
      <p className="folio-copy mt-6 max-w-xl">
        The page you requested is not part of the active folio anymore. Return to the main
        index or browse the current project archive.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="border border-[var(--folio-fg)] px-4 py-3 text-[0.7rem] uppercase tracking-[0.18em] transition hover:bg-[var(--folio-fg)] hover:text-black"
        >
          Back to home
        </Link>
        <Link
          to="/project"
          className="border border-[var(--folio-line)] px-4 py-3 text-[0.7rem] uppercase tracking-[0.18em] transition hover:border-[var(--folio-fg)]"
        >
          View projects
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
