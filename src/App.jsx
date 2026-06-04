import { useEffect, useMemo, useState } from "react";
import { LOCALES, resolveLocale, setDocumentLanguage } from "./i18n";
import { profile } from "./content/profile";

function Screw({ className = "" }) {
  return <div className={`screw ${className}`} />;
}

function Reel({ spinning = true, heavy = false }) {
  return (
    <div className={`reel ${spinning ? "spinning" : ""}`}>
      <div className={`reel-ring ${heavy ? "heavy" : ""}`} />
      <div className="reel-line horizontal" />
      <div className="reel-line vertical" />
      <div className="reel-line diagonal" />
      <div className="reel-line diagonal reverse" />
      <div className="reel-core" />
    </div>
  );
}

function SkillCard({ letter, title, subtitle, accent, active = false }) {
  return (
    <article className={`skill-card ${active ? "active" : ""}`}>
      <div className="skill-glyph" style={{ color: accent }}>
        {letter}
      </div>
      <div>
        <h4>{title}</h4>
        <p>{subtitle}</p>
      </div>
    </article>
  );
}

export default function App() {
  const [locale, setLocale] = useState(resolveLocale);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeView, setActiveView] = useState("feed");
  const [selectedProject, setSelectedProject] = useState(0);
  const [search, setSearch] = useState("");
  const [availabilityLed, setAvailabilityLed] = useState(true);
  const [cassettePhase, setCassettePhase] = useState("idle");

  useEffect(() => {
    setDocumentLanguage(locale);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", locale);
    window.history.replaceState({}, "", url);
  }, [locale]);

  const hero = profile.hero[locale];
  const sections = profile.sections[locale];
  const dictionary = useMemo(
    () => ({
      en: {
        exp: "EXP: 2+ YEARS",
        stack: "STACK: FULL-STACK",
        avail: "AVAIL: OPEN",
        availability: "Availability",
        openToWork: "OPEN TO WORK",
        feed: "Feed",
        find: "Find",
        logs: "Logs",
        me: "Me",
        playlist: "Project Playlist",
        mount: "Mount New Reel",
        cassetteLabel: "Session Title / Date",
        cassetteSide: "Side",
        tapeTitle: "kaiwen.dev / portfolio",
        tapeNote: "software engineer.\nbackend · ai · systems.",
        tapeSpec: "90 MIN TYPE II",
        tapeMeta: "CHAIN / API 26",
        coreStack: "Core Stack & Skills",
        findSessions: "Find Sessions",
        searchPlaceholder: "Search projects, skills, logs...",
        systemLogs: "System Logs",
        aboutMe: "About Me",
        contact: "Contact",
        stats: "Stats",
        education: "Education",
        modules: "Relevant Modules",
        years: "Years",
        projects: "Projects",
        degree: "Degree",
        location: "Location",
        selected: "Selected",
      },
      "zh-CN": {
        exp: "经验: 2+ 年",
        stack: "方向: 全栈",
        avail: "状态: 开放",
        availability: "求职状态",
        openToWork: "开放机会",
        feed: "主页",
        find: "检索",
        logs: "日志",
        me: "关于",
        playlist: "项目播放列表",
        mount: "装载新磁带",
        cassetteLabel: "主题 / 时间",
        cassetteSide: "面",
        tapeTitle: "kaiwen.dev / 档案",
        tapeNote: "软件工程师。\n后端 · AI · 系统。",
        tapeSpec: "90 分钟 TYPE II",
        tapeMeta: "CHAIN / API 26",
        coreStack: "核心技术栈",
        findSessions: "检索档案",
        searchPlaceholder: "搜索项目、技能、经历...",
        systemLogs: "系统日志",
        aboutMe: "关于我",
        contact: "联系",
        stats: "统计",
        education: "教育",
        modules: "相关课程",
        years: "年限",
        projects: "项目",
        degree: "学位",
        location: "地点",
        selected: "当前",
      },
    }),
    [],
  )[locale];

  const playlist = profile.projects.map((project, index) => ({
    number: String(index + 1).padStart(2, "0"),
    title: project.name.toUpperCase(),
    subtitle: project.stack.toUpperCase(),
    time: ["14:22", "08:45", "11:15"][index] || "06:30",
    accent: ["#34d399", "#fb7185", "#fbbf24"][index] || "#60a5fa",
  }));

  const selected = profile.projects[selectedProject];
  const selectedPlaylistItem = playlist[selectedProject];
  const filteredSkills = [...profile.skills.languages, ...profile.skills.technologies].filter((item) =>
    item.toLowerCase().includes(search.toLowerCase()),
  );
  const logs = [
    profile.experience[0],
    profile.experience[1],
    profile.experience[2],
  ];
  const tapeDetails = useMemo(
    () => ({
      title: selected.name.length > 28 ? `${selected.name.slice(0, 28)}...` : selected.name,
      side: String.fromCharCode(65 + selectedProject),
      log: selectedPlaylistItem.number,
      field: selected.stack.split(",")[0].replace(".js", "").replace(".JS", "").slice(0, 8).toUpperCase(),
      scene: selected.stack.split(",").length,
      note: selected.summary[locale],
      spec: selected.stack.toUpperCase(),
      meta: selectedPlaylistItem.time,
    }),
    [locale, selected, selectedPlaylistItem, selectedProject],
  );

  useEffect(() => {
    setCassettePhase("switching");
    const timer = window.setTimeout(() => {
      setCassettePhase("idle");
    }, 720);

    return () => window.clearTimeout(timer);
  }, [selectedProject]);

  const changeProject = (nextIndex) => {
    setSelectedProject((current) => {
      if (nextIndex === current) {
        return current;
      }
      return nextIndex;
    });
  };

  return (
    <div className="app-shell">
      <div className="layout">
        <main className="main-panel">
          {activeView === "feed" && (
            <div className="view feed-view">
              <header className="status-bar">
                <div className="status-meta">
                  <span>{dictionary.exp}</span>
                  <span>{dictionary.stack}</span>
                  <span>{dictionary.avail}</span>
                </div>

                <div className="availability-box">
                  <span className="label">{dictionary.availability}</span>
                  <div className="divider" />
                  <div className="availability-state">
                    <span className={`led-dot ${availabilityLed ? "on" : ""}`} />
                    <span className="state-text">{dictionary.openToWork}</span>
                  </div>
                </div>

                <div className="status-actions">
                  <div className="locale-switch" aria-label={sections.locale}>
                    {LOCALES.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={item === locale ? "active" : ""}
                        onClick={() => setLocale(item)}
                      >
                        {item === "en" ? "EN" : "中文"}
                      </button>
                    ))}
                  </div>
                  <button type="button" className="icon-button" onClick={() => setAvailabilityLed((v) => !v)}>
                    x
                  </button>
                </div>
              </header>

              <section className="cassette-stage">
                <div className={`cassette-shell ${cassettePhase}`}>
                  <div className="cassette-glow" style={{ "--accent": selectedPlaylistItem.accent }} />
                  <div className="cassette-body" style={{ "--accent": selectedPlaylistItem.accent }}>
                  <Screw className="top-left" />
                  <Screw className="top-right" />
                  <Screw className="mid-left" />
                  <Screw className="mid-right" />
                  <Screw className="bottom-left" />
                  <Screw className="bottom-right" />

                  <div className="cassette-label">
                    <div className="cassette-head">
                      <div>
                        <span>{dictionary.cassetteLabel}</span>
                        <h1>{tapeDetails.title}</h1>
                      </div>
                      <div className="cassette-side">
                        <span>{dictionary.cassetteSide}</span>
                        <strong>{tapeDetails.side}</strong>
                      </div>
                    </div>

                    <div className="tape-window">
                      <Reel spinning={isPlaying || cassettePhase === "switching"} heavy />
                      <div className="tape-center">
                        <div>
                          <span>LOG</span>
                          <strong>{tapeDetails.log}</strong>
                        </div>
                        <div>
                          <span>FLD</span>
                          <strong>{tapeDetails.field}</strong>
                        </div>
                        <div>
                          <span>SCN</span>
                          <strong>{String(tapeDetails.scene).padStart(2, "0")}</strong>
                        </div>
                      </div>
                      <Reel spinning={isPlaying || cassettePhase === "switching"} />
                    </div>

                    <div className="cassette-foot">
                      <p>{tapeDetails.note}</p>
                      <div className="cassette-spec">
                        <span>{tapeDetails.meta}</span>
                        <strong>{tapeDetails.spec}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="cassette-bottom">
                    <span />
                    <span className="square" />
                    <span />
                  </div>
                </div>
                </div>
              </section>

              <section className="hero-text">
                <p className="hero-eyebrow">{hero.eyebrow}</p>
                <h2>{hero.title}</h2>
                <p className="hero-summary">{hero.summary}</p>
                <div className="hero-cta">
                  <a href={`mailto:${profile.email}`}>{sections.sendEmail}</a>
                  <a href={profile.github} target="_blank" rel="noreferrer">
                    {sections.viewGithub}
                  </a>
                </div>
              </section>

              <section className="skills-rack">
                <div className="section-line">
                  <h3>{dictionary.coreStack}</h3>
                  <div className="line" />
                  <div className="meters">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <div className="skill-grid">
                  <SkillCard letter="T" title="TYPESCRIPT" subtitle="Type-Safe Systems" accent="#60a5fa" active />
                  <SkillCard letter="F" title="FASTAPI / NODE" subtitle="Backend Services" accent="#34d399" />
                  <SkillCard letter="R" title="REACT / NEXT.JS" subtitle="Frontend Architecture" accent="#fb7185" />
                  <SkillCard letter="D" title="POSTGRES / REDIS" subtitle="Data Layer & Queueing" accent="#c084fc" />
                </div>
              </section>
            </div>
          )}

          {activeView === "find" && (
            <div className="view">
              <div className="section-line">
                <h3>{dictionary.findSessions}</h3>
                <div className="line" />
              </div>
              <div className="search-box">
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={dictionary.searchPlaceholder}
                />
              </div>
              <div className="tag-grid">
                {filteredSkills.map((item) => (
                  <button key={item} type="button" className="tag-card">
                    <span>{item}</span>
                    <strong>SCAN</strong>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeView === "logs" && (
            <div className="view">
              <div className="section-line">
                <h3>{dictionary.systemLogs}</h3>
                <div className="line" />
              </div>
              <div className="logs-panel">
                {logs.map((item) => (
                  <div key={item.company} className="log-row">
                    <span className="log-time">{item.period}</span>
                    <span className="log-code">INF</span>
                    <div className="log-body">
                      <strong>{item.role[locale]} / {item.company}</strong>
                      <p>{item.bullets[locale][0]}</p>
                    </div>
                  </div>
                ))}
                <div className="logs-await">_ awaiting new input...</div>
              </div>
            </div>
          )}

          {activeView === "me" && (
            <div className="view me-view">
              <div className="avatar-shell">
                <div className="avatar-core">KL</div>
              </div>
              <div className="me-head">
                <h2>{profile.name}</h2>
                <p>{hero.eyebrow}</p>
              </div>
              <div className="info-grid">
                <article className="info-card">
                  <h3>{dictionary.contact}</h3>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  <a href={profile.github} target="_blank" rel="noreferrer">
                    github.com/Kaiwen0418
                  </a>
                  <span>{profile.location}</span>
                </article>
                <article className="info-card">
                  <h3>{dictionary.stats}</h3>
                  <div className="stat-row"><span>{dictionary.projects}</span><strong>3</strong></div>
                  <div className="stat-row"><span>{dictionary.years}</span><strong>2+</strong></div>
                  <div className="stat-row"><span>{dictionary.degree}</span><strong>MEng</strong></div>
                </article>
              </div>
              <article className="education-panel">
                <h3>{dictionary.education}</h3>
                <strong>{profile.education.degree[locale]}</strong>
                <p>{profile.education.school}</p>
                <span>{profile.education.period}</span>
                <div className="module-list">
                  {profile.education.modules.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            </div>
          )}
        </main>

        <aside className="sidebar">
          <div className="sidebar-head">
            <h3>{dictionary.playlist}</h3>
            <div className="line" />
          </div>
          <div className="playlist">
            {playlist.map((item, index) => (
              <button
                key={item.number}
                type="button"
                className={`playlist-item ${selectedProject === index ? "active" : ""}`}
                style={{ "--accent": item.accent }}
                onClick={() => changeProject(index)}
              >
                <span className="playlist-number" style={{ color: item.accent }}>
                  {item.number}
                </span>
                <div className="playlist-copy">
                  <strong>{item.title}</strong>
                  <span>{item.subtitle}</span>
                </div>
                <span className="playlist-time">{item.time}</span>
              </button>
            ))}
          </div>

          <article className="selected-project" style={{ "--accent": selectedPlaylistItem.accent }}>
            <span className="selected-label">{dictionary.selected}</span>
            <h3>{selected.name}</h3>
            <p>{selected.summary[locale]}</p>
            <ul>
              {selected.bullets[locale].map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        </aside>
      </div>

      <footer className="footer">
        <div className="footer-nav">
          {[
            ["feed", dictionary.feed],
            ["find", dictionary.find],
            ["logs", dictionary.logs],
          ].map(([id, label]) => (
            <button key={id} type="button" className={activeView === id ? "active" : ""} onClick={() => setActiveView(id)}>
              {label}
            </button>
          ))}
        </div>

        <div className="playback">
          <button type="button" className="transport-button" onClick={() => changeProject(Math.max(0, selectedProject - 1))}>
            prev
          </button>
          <button type="button" className="play-button" onClick={() => setIsPlaying((value) => !value)}>
            {isPlaying ? "pause" : "play"}
          </button>
          <button
            type="button"
            className="transport-button"
            onClick={() => changeProject(Math.min(profile.projects.length - 1, selectedProject + 1))}
          >
            next
          </button>
        </div>

        <button type="button" className={`me-button ${activeView === "me" ? "active" : ""}`} onClick={() => setActiveView("me")}>
          {dictionary.me}
        </button>
      </footer>
    </div>
  );
}
