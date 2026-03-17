import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { projData } from "../../data/data";
import SiteShell from "../SiteShell";

const statusById = {
  "1": "Active",
  "2": "Production",
  "3": "Embedded",
  "4": "Research",
};

const yearById = {
  "1": "2024",
  "2": "2023",
  "3": "2024",
  "4": "2022",
};

const projectIds = ["1", "2", "3", "4"];

const setFallbackImage = (event, fallbackSrc) => {
  if (!fallbackSrc || event.currentTarget.dataset.fallbackApplied === "true") {
    return;
  }

  event.currentTarget.dataset.fallbackApplied = "true";
  event.currentTarget.src = fallbackSrc;
};

const ProjectsArchive = () => {
  const [expandedId, setExpandedId] = useState(projectIds[0]);

  return (
    <SiteShell section="Projects" sectionCode="SYS.V2 ARCHIVE">
      <section className="mx-auto max-w-6xl">
        <div className="mb-10 border-b border-[var(--folio-line)] pb-6">
          <p className="mb-3 text-[0.72rem] uppercase tracking-[0.22em] text-[var(--folio-muted)]">
            Selected work
          </p>
          <h1 className="folio-display text-[clamp(3rem,8vw,5.5rem)] leading-[0.9]">
            Project Archive
          </h1>
          <p className="folio-copy mt-4 max-w-2xl">
            A small set of software and hardware-heavy builds, organized like a technical archive:
            compact overview first, deeper inspection on demand.
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
            const isExpanded = expandedId === id;

            return (
              <div key={id} className="border-b border-[var(--folio-line)] last:border-b-0">
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? "" : id)}
                  className="grid w-full gap-4 px-5 py-5 text-left transition hover:bg-white/5 md:grid-cols-[80px_1.4fr_1.2fr_100px_120px]"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--folio-fg)] text-[0.72rem] font-bold text-black">
                    0{id}
                  </span>
                  <span className="text-sm font-bold uppercase tracking-[0.08em] text-[var(--folio-fg)]">
                    {project.name}
                  </span>
                  <span className="text-sm text-[var(--folio-muted)]">
                    {project.details.map(([label, value]) => `${label} ${value}`).slice(0, 2).join(" / ")}
                  </span>
                  <span className="text-sm text-[var(--folio-fg)]">{yearById[id]}</span>
                  <span className="text-left text-[0.68rem] uppercase tracking-[0.18em] text-[var(--folio-accent)] md:text-right">
                    {statusById[id]}
                  </span>
                </button>

                {isExpanded && (
                  <div className="grid gap-6 bg-white/[0.02] px-5 pb-6 md:grid-cols-[260px_minmax(0,1fr)]">
                    <img
                      src={project.demoImage}
                      alt={project.name}
                      className="h-40 w-full border border-[var(--folio-line)] object-cover grayscale"
                      onError={(event) => setFallbackImage(event, project.demoImageFallback)}
                    />
                    <div className="space-y-4">
                      <div>
                        <p className="mb-2 text-[0.68rem] uppercase tracking-[0.18em] text-[var(--folio-muted)]">
                          Technical overview
                        </p>
                        <p className="folio-copy">{project.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {project.details.map(([label, value]) => (
                          <span key={label} className="folio-tag">
                            {label.replace(":", "")} {value}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={`/project/${id}`}
                        className="inline-flex border border-[var(--folio-fg)] px-4 py-3 text-[0.7rem] uppercase tracking-[0.18em] transition hover:bg-[var(--folio-fg)] hover:text-black"
                      >
                        Open project file
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </SiteShell>
  );
};

const ProjectDetail = ({ id }) => {
  const project = projData[id];

  const detailRows = useMemo(
    () =>
      project.details.map(([label, value]) => ({
        label: label.replace(":", ""),
        value,
      })),
    [project.details]
  );

  return (
    <SiteShell section="Project File" sectionCode={`SYS.V2 LOG_0${id}`}>
      <section className="grid min-h-[calc(100vh-12rem)] gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="flex flex-col gap-8 border-b border-[var(--folio-line)] pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
          <div className="overflow-hidden border border-[var(--folio-line)]">
            <img
              src={project.images.gif}
              alt={project.name}
              className="h-72 w-full object-cover grayscale"
            />
          </div>

          <div>
            <p className="mb-3 text-[0.72rem] uppercase tracking-[0.2em] text-[var(--folio-muted)]">
              Project record / {yearById[id]} / {statusById[id]}
            </p>
            <h1 className="folio-display text-[clamp(2.8rem,7vw,5.25rem)] leading-[0.9]">
              {project.name}
            </h1>
            <p className="mt-4 text-[0.85rem] uppercase tracking-[0.18em] text-[var(--folio-accent)]">
              {project.brief}
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

          <div className="flex flex-wrap gap-3">
            {project.url.github ? (
              <a
                href={project.url.github}
                target="_blank"
                rel="noreferrer"
                className="border border-[var(--folio-fg)] px-4 py-3 text-[0.7rem] uppercase tracking-[0.18em] transition hover:bg-[var(--folio-fg)] hover:text-black"
              >
                View source
              </a>
            ) : null}
            {project.url.site ? (
              <a
                href={project.url.site}
                target="_blank"
                rel="noreferrer"
                className="border border-[var(--folio-line)] px-4 py-3 text-[0.7rem] uppercase tracking-[0.18em] transition hover:border-[var(--folio-fg)]"
              >
                Open site
              </a>
            ) : null}
            <Link
              to="/project"
              className="border border-[var(--folio-line)] px-4 py-3 text-[0.7rem] uppercase tracking-[0.18em] transition hover:border-[var(--folio-fg)]"
            >
              Back to archive
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-8 lg:pl-2">
          <div className="folio-panel overflow-hidden">
            <div className="flex items-center gap-2 border-b border-[#ece8dd] bg-[#faf7f0] px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-[#d8d2c5]" />
              <span className="h-2 w-2 rounded-full bg-[#d8d2c5]" />
              <span className="h-2 w-2 rounded-full bg-[#d8d2c5]" />
            </div>
            <div className="grid min-h-[24rem] place-items-center bg-[linear-gradient(#ece8dd_1px,transparent_1px),linear-gradient(90deg,#ece8dd_1px,transparent_1px)] bg-[size:24px_24px] p-6">
              <img
                src={project.images.overview}
                alt={`${project.name} overview`}
                className="max-h-[28rem] w-full max-w-3xl object-contain shadow-[0_32px_80px_rgba(0,0,0,0.35)]"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-3 text-[0.72rem] uppercase tracking-[0.2em] text-[var(--folio-muted)]">
                Description
              </p>
              <p className="folio-copy">{project.description}</p>
            </div>
            <div>
              <p className="mb-3 text-[0.72rem] uppercase tracking-[0.2em] text-[var(--folio-muted)]">
                Notes
              </p>
              <p className="folio-copy">{project.projectHighlights}</p>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
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
