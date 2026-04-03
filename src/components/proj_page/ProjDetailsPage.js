import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { projData } from "../../data/data";
import { getProjectLocale, uiText } from "../../data/translations";
import { useLanguage } from "../../utils/LanguageContext";

const yearById = {
  "1": "2024",
  "2": "2023",
  "3": "2024",
  "4": "2022",
  "5": "2025",
};

const projectIds = ["1", "2", "3", "4", "5"];

const setFallbackImage = (event, fallbackSrc) => {
  if (!fallbackSrc || event.currentTarget.dataset.fallbackApplied === "true") {
    return;
  }

  event.currentTarget.dataset.fallbackApplied = "true";
  event.currentTarget.src = fallbackSrc;
};

const ProjectsArchive = () => {
  const { language } = useLanguage();
  const text = uiText[language].project;
  const [expandedId, setExpandedId] = useState(projectIds[0]);

  return (
    <section className="w-full">
      <div className="mb-8 border-b border-[var(--folio-line)] pb-6 md:mb-10">
        <p className="mb-3 text-[0.72rem] uppercase tracking-[0.22em] text-[var(--folio-muted)]">
          {text.selectedWork}
        </p>
        <h1 className="folio-display text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.9]">
          {text.archiveTitle}
        </h1>
        <p className="folio-copy mt-4 max-w-2xl">
          {text.archiveIntro}
        </p>
      </div>

      <div className="overflow-hidden border border-[var(--folio-line)]">
        <div className="hidden grid-cols-[80px_1.4fr_1.2fr_100px_120px] gap-4 border-b border-[var(--folio-line)] px-5 py-4 text-[0.68rem] uppercase tracking-[0.18em] text-[var(--folio-muted)] md:grid">
          <span>Id</span>
          <span>Project</span>
          <span>Stack</span>
          <span>Year</span>
          <span className="text-right">Status</span>
        </div>

        {projectIds.map((id) => {
          const project = projData[id];
          const localized = getProjectLocale(Number(id), language);
          const isExpanded = expandedId === id;

          return (
            <div key={id} className="border-b border-[var(--folio-line)] last:border-b-0">
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? "" : id)}
                className="grid w-full gap-3 px-4 py-4 text-left transition hover:bg-white/5 md:grid-cols-[80px_1.4fr_1.2fr_100px_120px] md:gap-4 md:px-5 md:py-5"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--folio-fg)] text-[0.72rem] font-bold text-black">
                  0{id}
                </span>
                <span className="text-sm font-bold uppercase tracking-[0.08em] text-[var(--folio-fg)]">
                  {localized.name}
                </span>
                <span className="text-sm text-[var(--folio-muted)]">
                  {localized.details.map(([label, value]) => `${label} ${value}`).slice(0, 2).join(" / ")}
                </span>
                <span className="text-sm text-[var(--folio-fg)]">{yearById[id]}</span>
                <span className="text-left text-[0.68rem] uppercase tracking-[0.18em] text-[var(--folio-accent)] md:text-right">
                  {text.status[id]}
                </span>
              </button>

              {isExpanded && (
                <div className="grid gap-5 bg-white/[0.02] px-4 pb-5 md:grid-cols-[260px_minmax(0,1fr)] md:gap-6 md:px-5 md:pb-6">
                  <img
                    src={project.demoImage}
                    alt={localized.name}
                    className="h-32 w-full border border-[var(--folio-line)] object-cover grayscale sm:h-40"
                    onError={(event) => setFallbackImage(event, project.demoImageFallback)}
                  />
                  <div className="space-y-4">
                    <div>
                      <p className="mb-2 text-[0.68rem] uppercase tracking-[0.18em] text-[var(--folio-muted)]">
                        {text.technicalOverview}
                      </p>
                      <p className="folio-copy">{localized.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {localized.details.map(([label, value]) => (
                        <span key={label} className="folio-tag">
                          {label.replace(":", "")} {value}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/project/${id}`}
                      className="inline-flex border border-[var(--folio-fg)] px-4 py-3 text-[0.7rem] uppercase tracking-[0.18em] transition hover:bg-[var(--folio-fg)] hover:text-black"
                    >
                      {text.openProjectFile}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

const ProjectDetail = ({ id }) => {
  const { language } = useLanguage();
  const text = uiText[language].project;
  const project = projData[id];
  const localized = getProjectLocale(Number(id), language);

  const detailRows = useMemo(
    () =>
      localized.details.map(([label, value]) => ({
        label: label.replace(":", ""),
        value,
      })),
    [localized.details]
  );

  return (
    <section className="grid min-h-[calc(100vh-12rem)] gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
      <div className="flex flex-col gap-6 border-b border-[var(--folio-line)] pb-8 lg:border-b-0 lg:border-r lg:gap-8 lg:pb-0 lg:pr-10">
        <div className="overflow-hidden border border-[var(--folio-line)]">
          <img
            src={project.images.gif}
            alt={localized.name}
            className="h-52 w-full object-cover grayscale sm:h-64 lg:h-72"
          />
        </div>

        <div>
          <p className="mb-3 text-[0.72rem] uppercase tracking-[0.2em] text-[var(--folio-muted)]">
            {text.projectRecord} / {yearById[id]} / {text.status[id]}
          </p>
          <h1 className="folio-display text-[clamp(2.1rem,7vw,5.25rem)] leading-[0.9]">
            {localized.name}
          </h1>
          <p className="mt-3 text-[0.78rem] uppercase tracking-[0.18em] text-[var(--folio-accent)] sm:mt-4 sm:text-[0.85rem]">
            {localized.brief}
          </p>
        </div>

        <div className="grid gap-3 border-t border-[var(--folio-line)] pt-6 text-sm">
          {detailRows.map((row) => (
            <div key={row.label} className="grid gap-2 sm:grid-cols-[120px_minmax(0,1fr)]">
              <span className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--folio-muted)]">
                {row.label}
              </span>
              <span className="text-[var(--folio-fg)]">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {project.url.github ? (
            <a
              href={project.url.github}
              target="_blank"
              rel="noreferrer"
            className="border border-[var(--folio-fg)] px-4 py-3 text-center text-[0.7rem] uppercase tracking-[0.18em] transition hover:bg-[var(--folio-fg)] hover:text-black"
          >
              {text.viewSource}
            </a>
          ) : null}
          {project.url.site ? (
            <a
              href={project.url.site}
              target="_blank"
              rel="noreferrer"
              className="border border-[var(--folio-line)] px-4 py-3 text-center text-[0.7rem] uppercase tracking-[0.18em] transition hover:border-[var(--folio-fg)]"
            >
              {text.openSite}
            </a>
          ) : null}
          <Link
            to="/project"
            className="border border-[var(--folio-line)] px-4 py-3 text-center text-[0.7rem] uppercase tracking-[0.18em] transition hover:border-[var(--folio-fg)]"
          >
            {text.backToArchive}
          </Link>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-6 lg:gap-8 lg:pl-2">
        <div className="folio-panel overflow-hidden">
          <div
            className="flex items-center gap-2 border-b px-4 py-3"
            style={{ borderColor: "var(--folio-window-line)", background: "var(--folio-window-bg)" }}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: "var(--folio-window-dot)" }} />
            <span className="h-2 w-2 rounded-full" style={{ background: "var(--folio-window-dot)" }} />
            <span className="h-2 w-2 rounded-full" style={{ background: "var(--folio-window-dot)" }} />
          </div>
          <div
            className="grid min-h-[16rem] place-items-center p-4 sm:min-h-[20rem] sm:p-6 md:min-h-[24rem]"
            style={{
              backgroundImage:
                "linear-gradient(var(--folio-window-line) 1px, transparent 1px), linear-gradient(90deg, var(--folio-window-line) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              backgroundColor: "var(--folio-window-bg)",
            }}
          >
            <img
              src={project.images.overview}
              alt={`${localized.name} overview`}
              className="max-h-[28rem] w-full max-w-3xl object-contain shadow-[0_32px_80px_rgba(0,0,0,0.35)]"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="mb-3 text-[0.72rem] uppercase tracking-[0.2em] text-[var(--folio-muted)]">
              {text.description}
            </p>
            <p className="folio-copy">{localized.description}</p>
          </div>
          <div>
            <p className="mb-3 text-[0.72rem] uppercase tracking-[0.2em] text-[var(--folio-muted)]">
              {text.notes}
            </p>
            <p className="folio-copy">{localized.projectHighlights}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjDetailsPage = () => {
  const { id } = useParams();

  if (!id) {
    return <ProjectsArchive />;
  }

  if (!projData[id]) {
    return <ProjectsArchive />;
  }

  return <ProjectDetail id={id} />;
};

export default ProjDetailsPage;
