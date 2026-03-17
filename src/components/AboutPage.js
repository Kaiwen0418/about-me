import React from "react";
import SiteShell from "./SiteShell";

const educationItems = [
  {
    year: "2020-2024",
    label: "Imperial College London",
    description: "MEng in Electrical and Electronic Engineering with a focus on systems thinking, software-heavy tooling, and hardware-aware design.",
  },
  {
    year: "2023",
    label: "CloudNC Ltd",
    description: "Built workflow analysis and scheduling tooling around manufacturing data, where latency, clarity, and operator trust all mattered.",
  },
  {
    year: "Ongoing",
    label: "Independent Projects",
    description: "Prototype-heavy work across interface systems, creative coding, and embedded applications that need to explain themselves quickly.",
  },
];

const notes = [
  "System-oriented developer focused on the seam between constrained hardware and high-level software.",
  "Strong interest in visual hierarchy, interaction density, and interfaces that reward close inspection.",
  "Best fit work usually combines technical precision, product judgment, and some amount of aesthetic tension.",
];

const AboutPage = () => {
  return (
    <SiteShell section="About" sectionCode="SYS.V2 DOSSIER">
      <section className="mx-auto max-w-6xl">
        <div className="folio-panel overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--folio-line)] px-5 py-4 text-[0.68rem] uppercase tracking-[0.18em] text-[var(--folio-muted)]">
            <span>Terminal session // profile.log</span>
            <span>Location // London, UK</span>
          </div>

          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="border-b border-[var(--folio-line)] p-6 lg:border-b-0 lg:border-r">
              <div className="space-y-6">
                <div>
                  <p className="mb-3 text-[0.75rem] uppercase tracking-[0.22em] text-[var(--folio-muted)]">
                    &gt; cat biography.txt
                  </p>
                  <p className="folio-copy max-w-2xl">
                    Kaiwen Liu is a developer who likes interfaces with structure and systems with
                    sharp edges. Most projects start at a technical problem and end as a design
                    problem: how to make complexity legible, responsive, and useful under pressure.
                  </p>
                </div>

                <div>
                  <p className="mb-4 text-[0.75rem] uppercase tracking-[0.22em] text-[var(--folio-muted)]">
                    &gt; ls --timeline background/
                  </p>
                  <div className="space-y-6">
                    {educationItems.map((item) => (
                      <div key={item.label} className="relative border-l border-dashed border-[var(--folio-line)] pl-6">
                        <span className="absolute left-[-5px] top-1 h-2 w-2 bg-[var(--folio-fg)]" />
                        <p className="mb-1 text-sm font-bold uppercase tracking-[0.14em] text-[var(--folio-fg)]">
                          {item.year}
                        </p>
                        <p className="mb-2 text-[0.75rem] uppercase tracking-[0.16em] text-[var(--folio-accent)]">
                          {item.label}
                        </p>
                        <p className="folio-copy">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <p className="mb-4 text-[0.75rem] uppercase tracking-[0.22em] text-[var(--folio-muted)]">
                    &gt; tree ./attributes
                  </p>
                  <div className="space-y-3 text-[0.8rem] leading-7 text-[var(--folio-muted)]">
                    <div className="flex justify-between gap-4 border-b border-[var(--folio-line)] pb-2">
                      <span>software/frontend</span>
                      <span>dense UI systems</span>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-[var(--folio-line)] pb-2">
                      <span>software/backend</span>
                      <span>tooling + data flow</span>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-[var(--folio-line)] pb-2">
                      <span>hardware</span>
                      <span>embedded + device logic</span>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-[var(--folio-line)] pb-2">
                      <span>design</span>
                      <span>layout, motion, identity</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-4 text-[0.75rem] uppercase tracking-[0.22em] text-[var(--folio-muted)]">
                    &gt; cat notes.md
                  </p>
                  <div className="space-y-4">
                    {notes.map((note) => (
                      <p key={note} className="folio-copy">
                        {note}
                      </p>
                    ))}
                  </div>
                </div>

                <a
                  href="mailto:kaiwenliu0418@gmail.com"
                  className="inline-flex border border-[var(--folio-fg)] px-4 py-3 text-[0.7rem] uppercase tracking-[0.2em] transition hover:bg-[var(--folio-fg)] hover:text-black"
                >
                  Open contact channel
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
};

export default AboutPage;
