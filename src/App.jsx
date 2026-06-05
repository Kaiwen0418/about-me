import { useEffect, useMemo, useRef, useState } from "react";
import { LOCALES, resolveLocale, setDocumentLanguage } from "./i18n";
import { profile } from "./content/profile";

const CASSETTE_MODEL_WIDTH = 720;
const REEL_SLOWDOWN_MS = 280;
const CASSETTE_EJECT_MS = 360;
const CASSETTE_INSERT_MS = 400;
const CASSETTE_SETTLE_MS = 80;

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
      <div className="skill-card-inner">
        <div className="skill-glyph" style={{ color: accent }}>
          {letter}
        </div>
        <div>
          <h4>{title}</h4>
          <p>{subtitle}</p>
        </div>
      </div>
    </article>
  );
}

function buildStackCards(item, locale) {
  if (item.type === "profile") {
    return [
      { letter: "T", title: "TYPESCRIPT", subtitle: locale === "en" ? "Type-Safe Systems" : "类型安全系统", accent: "#60a5fa", active: true },
      { letter: "F", title: "FASTAPI", subtitle: locale === "en" ? "Backend Services" : "后端服务", accent: "#34d399" },
      { letter: "R", title: "REACT", subtitle: locale === "en" ? "Frontend Interface" : "前端界面", accent: "#fb7185" },
      { letter: "D", title: "POSTGRES", subtitle: locale === "en" ? "Data Layer" : "数据层", accent: "#c084fc" },
    ];
  }

  const subtitles =
    locale === "en"
      ? ["Primary Runtime", "Framework Layer", "Interface / Infra", "Support Layer"]
      : ["核心运行时", "框架层", "界面 / 基建", "辅助层"];

  return item.subtitle
    .split(",")
    .map((part) => part.trim())
    .slice(0, 4)
    .map((part, index) => ({
      letter: part.replace(/[^A-Z.]/g, "").charAt(0) || part.charAt(0) || "S",
      title: part,
      subtitle: subtitles[index] || subtitles[subtitles.length - 1],
      accent: ["#60a5fa", "#34d399", "#fb7185", "#c084fc"][index] || "#ffb000",
      active: index === 0,
    }));
}

function Cassette({ tapeDetails, accent, spinning, dictionary, className = "" }) {
  return (
    <div className={`cassette-body ${className}`} style={{ "--accent": accent }}>
      <Screw className="top-left" />
      <Screw className="top-right" />
      <Screw className="mid-left" />
      <Screw className="mid-right" />
      <Screw className="bottom-left" />
      <Screw className="bottom-right" />

      <div className="cassette-label">
        <div className="cassette-head">
          <div>
            <h1>{tapeDetails.title}</h1>
          </div>
          <div className="cassette-side">
            <span>{dictionary.cassetteSide}</span>
            <strong>{tapeDetails.side}</strong>
          </div>
        </div>

        <div className="tape-window">
          <Reel spinning={spinning} heavy />
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
              <strong>{tapeDetails.scene}</strong>
            </div>
          </div>
          <Reel spinning={spinning} />
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
  );
}

export default function App() {
  const [locale, setLocale] = useState(resolveLocale);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeView, setActiveView] = useState("feed");
  const [selectedEntry, setSelectedEntry] = useState(0);
  const [search, setSearch] = useState("");
  const [availabilityLed, setAvailabilityLed] = useState(true);
  const [cassettePhase, setCassettePhase] = useState("idle");
  const [displayedEntry, setDisplayedEntry] = useState(0);
  const [incomingEntry, setIncomingEntry] = useState(null);
  const [showPlayPopup, setShowPlayPopup] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const cassetteStackRef = useRef(null);

  useEffect(() => {
    setDocumentLanguage(locale);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", locale);
    window.history.replaceState({}, "", url);
  }, [locale]);

  useEffect(() => {
    const stack = cassetteStackRef.current;
    if (!stack) return undefined;

    const updateScale = () => {
      const availableWidth = stack.clientWidth || CASSETTE_MODEL_WIDTH;
      const scale = Math.min(1, availableWidth / CASSETTE_MODEL_WIDTH);
      stack.style.setProperty("--cassette-scale", scale.toFixed(4));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(stack);
    window.addEventListener("resize", updateScale);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, []);

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
        playlist: "Playlist",
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
        profile: "Profile",
        openGithub: "Open GitHub",
        currentLink: "Current Link",
        list: "List",
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
        playlist: "播放列表",
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
        profile: "个人",
        openGithub: "打开 GitHub",
        currentLink: "当前链接",
        list: "列表",
      },
    }),
    [],
  )[locale];

  const playlist = useMemo(
    () => [
      {
        type: "profile",
        number: "00",
        title: profile.name.toUpperCase(),
        subtitle: hero.eyebrow.toUpperCase(),
        time: "00:01",
        accent: "#ffb000",
        url: profile.github,
        detailsTitle: profile.name,
        detailsSummary: hero.summary,
        bullets: [
          profile.location,
          profile.email,
          "github.com/Kaiwen0418",
        ],
        tape: {
          title: "Kaiwen Liu / Profile",
          side: "P",
          log: "00",
          field: "ME",
          scene: "01",
          note: locale === "en" ? "software engineer.\nbackend · ai · systems." : "软件工程师。\n后端 · AI · 系统。",
          spec: "PERSONAL GITHUB",
          meta: "00:01",
        },
      },
      ...profile.projects.map((project, index) => ({
        type: "project",
        number: String(index + 1).padStart(2, "0"),
        title: project.name.toUpperCase(),
        subtitle: project.stack.toUpperCase(),
        time: ["14:22", "08:45", "11:15"][index] || "06:30",
        accent: ["#34d399", "#fb7185", "#fbbf24"][index] || "#60a5fa",
        url: project.github || profile.github,
        detailsTitle: project.name,
        detailsSummary: project.summary[locale],
        bullets: project.bullets[locale],
        tape: {
          title: project.name.length > 28 ? `${project.name.slice(0, 28)}...` : project.name,
          side: String.fromCharCode(65 + index),
          log: String(index + 1).padStart(2, "0"),
          field: project.stack.split(",")[0].replace(".js", "").replace(".JS", "").slice(0, 8).toUpperCase(),
          scene: String(project.stack.split(",").length).padStart(2, "0"),
          note:
            locale === "en"
              ? [
                  "real-time agent evals.",
                  "prediction market signals.",
                  "circuit sim, rebuilt lean.",
                ][index] || project.summary[locale]
              : [
                  "实时 agent 评测。",
                  "预测市场信号面板。",
                  "轻量重构电路模拟器。",
                ][index] || project.summary[locale],
          spec: project.stack.toUpperCase(),
          meta: ["14:22", "08:45", "11:15"][index] || "06:30",
        },
      })),
    ],
    [hero.eyebrow, hero.summary, locale],
  );

  const selectedPlaylistItem = playlist[selectedEntry];
  const displayedPlaylistItem = playlist[displayedEntry];
  const incomingPlaylistItem = incomingEntry === null ? null : playlist[incomingEntry];
  const stackCards = useMemo(() => buildStackCards(selectedPlaylistItem, locale), [locale, selectedPlaylistItem]);
  const filteredSkills = [...profile.skills.languages, ...profile.skills.technologies].filter((item) =>
    item.toLowerCase().includes(search.toLowerCase()),
  );
  const logs = [
    profile.experience[0],
    profile.experience[1],
    profile.experience[2],
  ];
  const tapeDetails = displayedPlaylistItem.tape;

  useEffect(() => {
    if (selectedEntry === displayedEntry) {
      return undefined;
    }

    setShowPlayPopup(false);
    setIncomingEntry(selectedEntry);
    setCassettePhase("settling");

    const ejectTimer = window.setTimeout(() => {
      setCassettePhase("ejecting");
    }, REEL_SLOWDOWN_MS);

    const swapTimer = window.setTimeout(() => {
      setDisplayedEntry(selectedEntry);
      setCassettePhase("inserting");
    }, REEL_SLOWDOWN_MS + CASSETTE_EJECT_MS);

    const doneTimer = window.setTimeout(() => {
      setCassettePhase("settled");
    }, REEL_SLOWDOWN_MS + CASSETTE_EJECT_MS + CASSETTE_INSERT_MS);

    const cleanupTimer = window.setTimeout(() => {
      setIncomingEntry(null);
      setCassettePhase("idle");
    }, REEL_SLOWDOWN_MS + CASSETTE_EJECT_MS + CASSETTE_INSERT_MS + CASSETTE_SETTLE_MS);

    return () => {
      window.clearTimeout(ejectTimer);
      window.clearTimeout(swapTimer);
      window.clearTimeout(doneTimer);
      window.clearTimeout(cleanupTimer);
    };
  }, [selectedEntry]);

  const changeEntry = (nextIndex) => {
    if (cassettePhase !== "idle" || nextIndex < 0 || nextIndex >= playlist.length) {
      return;
    }
    setMobileSidebarOpen(false);
    setSelectedEntry((current) => {
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
                  <span className="meta-primary">{dictionary.exp}</span>
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
                </div>
              </header>

              <section className="cassette-stage">
                <div className={`cassette-shell ${cassettePhase}`}>
                  <div className="cassette-glow" style={{ "--accent": (incomingPlaylistItem || displayedPlaylistItem).accent }} />
                  <div className="cassette-stack" ref={cassetteStackRef}>
                    <Cassette
                      tapeDetails={tapeDetails}
                      accent={displayedPlaylistItem.accent}
                      spinning={isPlaying && cassettePhase === "idle"}
                      dictionary={dictionary}
                      className={`cassette-current ${cassettePhase === "ejecting" ? "is-ejecting" : ""}`}
                    />
                    {incomingPlaylistItem && (
                      <Cassette
                        tapeDetails={incomingPlaylistItem.tape}
                        accent={incomingPlaylistItem.accent}
                        spinning={false}
                        dictionary={dictionary}
                        className={`cassette-incoming ${cassettePhase === "inserting" ? "is-inserting" : ""}`}
                      />
                    )}
                  </div>
                </div>
              </section>

              <section className="skills-rack">
                <div className="section-line">
                  <h3>{selectedPlaylistItem.type === "profile" ? dictionary.coreStack : selectedPlaylistItem.subtitle}</h3>
                  <div className="line" />
                  <div className="meters">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <div className="skill-grid">
                  {stackCards.map((card) => (
                    <SkillCard
                      key={`${selectedPlaylistItem.number}-${card.title}`}
                      letter={card.letter}
                      title={card.title}
                      subtitle={card.subtitle}
                      accent={card.accent}
                      active={card.active}
                    />
                  ))}
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

        <aside className={`sidebar ${mobileSidebarOpen ? "mobile-open" : ""}`}>
          <div className="sidebar-head">
            <h3>{dictionary.playlist}</h3>
            <div className="line" />
          </div>
          <div className="playlist">
            {playlist.map((item, index) => (
              <button
                key={item.number}
                type="button"
                className={`playlist-item ${selectedEntry === index ? "active" : ""} ${cassettePhase !== "idle" ? "is-locked" : ""}`}
                style={{ "--accent": item.accent }}
                onClick={() => changeEntry(index)}
              >
                <span className="playlist-number">
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
            <h3>{selectedPlaylistItem.detailsTitle}</h3>
            <p>{selectedPlaylistItem.detailsSummary}</p>
            <ul>
              {selectedPlaylistItem.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        </aside>
      </div>
      <button
        type="button"
        className={`sidebar-backdrop ${mobileSidebarOpen ? "visible" : ""}`}
        aria-label="Close playlist"
        onClick={() => setMobileSidebarOpen(false)}
      />

      <footer className="footer">
        <button
          type="button"
          className="transport-button sidebar-toggle-button"
          onClick={() => setMobileSidebarOpen((value) => !value)}
          aria-label={dictionary.list}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" x2="20" y1="7" y2="7" />
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="17" y2="17" />
          </svg>
        </button>

        <div className="playback">
          <button type="button" className="transport-button icon-transport" onClick={() => changeEntry(Math.max(0, selectedEntry - 1))} disabled={cassettePhase !== "idle"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="19 20 9 12 19 4 19 20" />
              <line x1="5" x2="5" y1="19" y2="5" />
            </svg>
          </button>
          <div className="play-button-wrap">
            {showPlayPopup && (
              <div className="play-popup">
                <span>{dictionary.currentLink}</span>
                <strong>{selectedPlaylistItem.detailsTitle}</strong>
                <a href={selectedPlaylistItem.url} target="_blank" rel="noreferrer" onClick={() => setShowPlayPopup(false)}>
                  {dictionary.openGithub}
                </a>
              </div>
            )}
            <button type="button" className="play-button" onClick={() => { setIsPlaying((value) => !value); setShowPlayPopup((value) => !value); }}>
              <div className="play-button-inner">
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="play-icon">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="play-icon play-shift">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </div>
            </button>
          </div>
          <button
            type="button"
            className="transport-button icon-transport"
            onClick={() => changeEntry(Math.min(playlist.length - 1, selectedEntry + 1))}
            disabled={cassettePhase !== "idle"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 4 15 12 5 20 5 4" />
              <line x1="19" x2="19" y1="5" y2="19" />
            </svg>
          </button>
        </div>

        <div className="locale-switch footer-locale-switch" aria-label={sections.locale}>
          {LOCALES.map((item) => (
              <button
              key={item}
              type="button"
              className={item === locale ? "active" : ""}
              onClick={() => setLocale(item)}
            >
              {item === "en" ? "EN" : "中"}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}
