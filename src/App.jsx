import { useEffect, useMemo, useRef, useState } from "react";
import { LOCALES, resolveLocale, setDocumentLanguage } from "./i18n";
import { profile } from "./content/profile";

const CASSETTE_MODEL_WIDTH = 720;
const REEL_SLOWDOWN_MS = 280;
const CASSETTE_EJECT_MS = 360;
const CASSETTE_INSERT_MS = 400;
const CASSETTE_SETTLE_MS = 80;
const CASSETTE_FLIP_MS = 1150;
const PLAYLIST_TRACK_SECONDS = 30;

function formatTrackTime(seconds) {
  const safeSeconds = Math.max(0, seconds);
  return `${String(Math.floor(safeSeconds / 60)).padStart(2, "0")}:${String(safeSeconds % 60).padStart(2, "0")}`;
}

function resolveAssetUrl(path) {
  return path ? `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}` : "";
}

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

function SocialIcon({ type }) {
  const isGithub = type === "github";

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={`social-mark social-mark-${type}`}>
      <rect width="32" height="32" rx="8" fill="#080808" />
      {isGithub ? (
        <path
          fill="#fff"
          d="M16 7.2a9 9 0 0 0-2.85 17.54c.45.08.61-.2.61-.43v-1.68c-2.5.54-3.03-1.06-3.03-1.06-.41-1.04-1-1.31-1-1.31-.82-.56.06-.55.06-.55.9.06 1.38.93 1.38.93.81 1.38 2.11.98 2.63.75.08-.58.32-.98.57-1.2-2-.23-4.1-1-4.1-4.45 0-.98.35-1.79.93-2.42-.09-.23-.4-1.14.09-2.38 0 0 .76-.24 2.48.92A8.6 8.6 0 0 1 16 11.55c.77 0 1.53.1 2.25.3 1.72-1.16 2.48-.92 2.48-.92.49 1.24.18 2.15.09 2.38.58.63.93 1.44.93 2.42 0 3.46-2.11 4.21-4.11 4.44.32.28.61.83.61 1.68v2.46c0 .24.16.52.62.43A9 9 0 0 0 16 7.2Z"
        />
      ) : (
        <>
          <path fill="#fff" d="M8.3 12.3h3.2V24H8.3zM9.9 7.1a1.86 1.86 0 1 1 0 3.72 1.86 1.86 0 0 1 0-3.72Z" />
          <path fill="#fff" d="M14.2 12.3h3.06v1.6h.04c.43-.81 1.47-1.67 3.02-1.67 3.23 0 3.83 2.13 3.83 4.9V24h-3.19v-6.1c0-1.46-.03-3.33-2.03-3.33-2.03 0-2.34 1.58-2.34 3.22V24H14.2V12.3Z" />
        </>
      )}
    </svg>
  );
}

function TechIcon({ name, accent }) {
  const normalized = name.toLowerCase().replaceAll(".", "").replaceAll(" ", "").replaceAll("#", "");
  const label = {
    typescript: "TS",
    fastapi: "FA",
    react: "R",
    reactjs: "R",
    postgres: "PG",
    postgresql: "PG",
    nextjs: "N",
    numpy: "NP",
    net: ".N",
    avaloniaui: "A",
    f: "F#",
    project: "↗",
  }[normalized] || name.slice(0, 2).toUpperCase();

  if (normalized === "react" || normalized === "reactjs") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="tech-icon" style={{ color: accent }}>
        <ellipse cx="16" cy="16" rx="12" ry="4.8" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <ellipse cx="16" cy="16" rx="12" ry="4.8" fill="none" stroke="currentColor" strokeWidth="1.8" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="12" ry="4.8" fill="none" stroke="currentColor" strokeWidth="1.8" transform="rotate(120 16 16)" />
        <circle cx="16" cy="16" r="2.3" fill="currentColor" />
      </svg>
    );
  }

  if (normalized === "postgres" || normalized === "postgresql") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="tech-icon" style={{ color: accent }}>
        <ellipse cx="16" cy="8" rx="9" ry="3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7 8v10c0 1.9 4 3.5 9 3.5s9-1.6 9-3.5V8M7 13c0 1.9 4 3.5 9 3.5s9-1.6 9-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M13 25h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (normalized === "fastapi") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="tech-icon" style={{ color: accent }}>
        <path d="M18.5 3.5 8.8 17h6l-1.3 11.5L23.2 15h-6L18.5 3.5Z" fill="currentColor" />
      </svg>
    );
  }

  if (normalized === "numpy") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="tech-icon" style={{ color: accent }}>
        <path d="M6.5 7.5h7v7h-7zM18.5 7.5h7v7h-7zM6.5 18.5h7v7h-7zM18.5 18.5h7v7h-7z" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="m8.5 12 3-3m9 3 3-3m-15 14 3-3m9 3 3-3" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }

  if (normalized === "docker") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="tech-icon" style={{ color: accent }}>
        <path d="M6 14h4v-3h4v3h4v-3h4v3h4v4c0 4-3.1 7-7.2 7H13.2C9.2 25 6 21.8 6 18v-4Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M10 18h4m0 0h4m0 0h4M11 8h3m1 0h3m1 0h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (normalized === "electronjs") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="tech-icon" style={{ color: accent }}>
        <circle cx="16" cy="16" r="2.5" fill="currentColor" />
        <ellipse cx="16" cy="16" rx="12" ry="4.7" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <ellipse cx="16" cy="16" rx="12" ry="4.7" fill="none" stroke="currentColor" strokeWidth="1.7" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="12" ry="4.7" fill="none" stroke="currentColor" strokeWidth="1.7" transform="rotate(120 16 16)" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="tech-icon tech-icon-label" style={{ color: accent }}>
      {normalized === "typescript" && <rect x="4" y="4" width="24" height="24" rx="2" fill="currentColor" opacity="0.2" />}
      {normalized === "nextjs" && <path d="M7 24V8l18 16V8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />}
      {normalized === "avaloniaui" && <path d="m16 5 10 22H6L16 5Zm0 7-3.2 9h6.4L16 12Z" fill="currentColor" />}
      {normalized === "project" && <path d="M8 24 24 8m-10 0h10v10" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />}
      {!['nextjs', 'avaloniaui', 'project'].includes(normalized) && (
        <text x="16" y="20.2" textAnchor="middle" fill="currentColor" fontSize={label.length > 2 ? "9" : "13"} fontWeight="700" fontFamily="Space Mono, monospace">
          {label}
        </text>
      )}
    </svg>
  );
}

function SkillCard({ title, subtitle, accent, active = false, href = "" }) {
  const CardElement = href ? "a" : "article";

  return (
    <CardElement
      className={`skill-card ${active ? "active" : ""} ${href ? "skill-card-link" : ""}`}
      {...(href
        ? {
            href,
            target: "_blank",
            rel: "noreferrer",
            "aria-label": `${title}: ${subtitle}`,
          }
        : {})}
    >
      <div className="skill-card-inner">
        <div className="skill-glyph">
          <TechIcon name={title} accent={accent} />
        </div>
        <div>
          <h4>{title}</h4>
          <p>{subtitle}</p>
        </div>
      </div>
    </CardElement>
  );
}

function SelectedInfo({ item, locale, dictionary, className, as: Container = "article" }) {
  return (
    <Container className={className} style={{ "--accent": item.accent }}>
      <div className="info-heading">
        <span className="selected-label">{dictionary.selected}</span>
        <a
          className="info-github-link"
          href={item.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${item.detailsTitle} on GitHub`}
          title="Open GitHub"
        >
          <SocialIcon type="github" />
        </a>
      </div>
      <h3>{item.detailsTitle}</h3>
      <p>{item.detailsSummary}</p>
      <ul>
        {item.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      {item.type === "profile" && (
        <section className="info-experience" aria-label={dictionary.experience}>
          <span className="info-experience-label">{dictionary.experience}</span>
          {profile.experience.map((entry) => (
            <article className="info-experience-entry" key={entry.company}>
              <strong>{entry.role[locale]}</strong>
              <span>{entry.company} · {entry.period}</span>
            </article>
          ))}
        </section>
      )}
    </Container>
  );
}

function buildStackCards(item, locale) {
  if (item.type === "profile") {
    const allProjectSkills = [...new Set(profile.projects.flatMap((project) => project.stack.split(",").map((part) => part.trim())))];
    const labels = locale === "en"
      ? {
          "TypeScript": "Type-Safe Systems",
          "Next.js": "Framework Layer",
          Docker: "Container Runtime",
          "NumPy": "Data Computing",
          FastAPI: "Backend Services",
          "React.js": "Frontend Interface",
          ".NET": "Primary Runtime",
          "Avalonia UI": "Framework Layer",
          "F#": "Functional Systems",
          "Electron.js": "Desktop Runtime",
        }
      : {
          "TypeScript": "类型安全系统",
          "Next.js": "框架层",
          Docker: "容器运行时",
          "NumPy": "数据计算",
          FastAPI: "后端服务",
          "React.js": "前端界面",
          ".NET": "核心运行时",
          "Avalonia UI": "框架层",
          "F#": "函数式系统",
          "Electron.js": "桌面运行时",
        };

    return allProjectSkills.map((title, index) => ({
      title,
      subtitle: labels[title] || (locale === "en" ? "Project Stack" : "项目技术栈"),
      accent: ["#60a5fa", "#f5f5f5", "#38bdf8", "#eab308", "#34d399", "#fb7185", "#8b5cf6", "#f97316", "#06b6d4", "#a3e635"][index] || "#f5f5f5",
      active: index === 0,
    }));
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

function Cassette({
  tapeDetails,
  accent,
  spinning,
  dictionary,
  className = "",
  flipped = false,
  imageUrl = "",
  backTapeDetails = null,
  experienceEntries = [],
  locale = "en",
  interactive = false,
  onActivate,
  backSettled = false,
  flipPreparing = false,
}) {
  const handleKeyDown = (event) => {
    if (!interactive || !onActivate || (event.key !== "Enter" && event.key !== " ")) {
      return;
    }
    event.preventDefault();
    onActivate();
  };

  return (
    <div
      className={`cassette-body ${className} ${interactive ? "cassette-interactive" : ""}`}
      style={{ "--accent": accent }}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={
        interactive
          ? `${tapeDetails.title}: ${spinning ? "pause playback" : "resume playback"}`
          : undefined
      }
      onClick={interactive ? onActivate : undefined}
      onKeyDown={handleKeyDown}
    >
      <div className={`cassette-flipper ${flipped ? "is-flipped" : ""} ${backSettled ? "is-back-settled" : ""} ${flipPreparing ? "is-flip-preparing" : ""}`}>
        <div className="cassette-face cassette-front">
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

        <div className={`cassette-face cassette-back ${backTapeDetails ? "cassette-profile-back" : ""}`}>
          {backTapeDetails ? (
            <>
              <Screw className="top-left" />
              <Screw className="top-right" />
              <Screw className="mid-left" />
              <Screw className="mid-right" />
              <Screw className="bottom-left" />
              <Screw className="bottom-right" />
              <div className="experience-sheet">
                <header className="experience-sheet-head">
                  <span>{locale === "en" ? "Side B / Experience" : "B 面 / 工作经历"}</span>
                  <strong>KL / 2026</strong>
                </header>
                <div className="experience-sheet-grid">
                  {experienceEntries.map((entry, index) => (
                    <article className={`experience-sheet-entry experience-sheet-entry-${index + 1}`} key={entry.company}>
                      <div className="experience-entry-title">
                        <h2>{entry.role[locale]}</h2>
                        <time>{entry.period}</time>
                      </div>
                      <p className="experience-entry-company">
                        <strong>{entry.company}</strong>
                        <span>{entry.location}</span>
                      </p>
                      <ul>
                        {entry.bullets[locale].map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
              <div className="cassette-bottom">
                <span />
                <span className="square" />
                <span />
              </div>
            </>
          ) : (
            <>
              <Screw className="top-left" />
              <Screw className="top-right" />
              <Screw className="bottom-left" />
              <Screw className="bottom-right" />
              <div className="cassette-back-label">
                <div className="cassette-back-head">
                  <span>{dictionary.projectImage}</span>
                  <strong>{tapeDetails.side} / B</strong>
                </div>
                <div
                  className={`cassette-project-image ${imageUrl ? "has-image" : ""}`}
                  style={imageUrl ? { backgroundImage: `url("${imageUrl}")` } : undefined}
                >
                  {!imageUrl && (
                    <div className="cassette-image-placeholder">
                      <span>IMAGE SLOT</span>
                      <strong>{tapeDetails.title}</strong>
                      <small>{dictionary.uploadLater}</small>
                    </div>
                  )}
                </div>
                <div className="cassette-back-foot">
                  <span>{tapeDetails.meta}</span>
                  <strong>{tapeDetails.spec}</strong>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="cassette-edge cassette-edge-top" aria-hidden="true" />
        <div className="cassette-edge cassette-edge-right" aria-hidden="true" />
        <div className="cassette-edge cassette-edge-bottom" aria-hidden="true" />
        <div className="cassette-edge cassette-edge-left" aria-hidden="true" />
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
  const [isCassetteFlipped, setIsCassetteFlipped] = useState(false);
  const [isCassetteBackSettled, setIsCassetteBackSettled] = useState(false);
  const [isCassetteFlipPreparing, setIsCassetteFlipPreparing] = useState(false);
  const [isEntrySwitchPreparing, setIsEntrySwitchPreparing] = useState(false);
  const [flipCounter, setFlipCounter] = useState(0);
  const [trackSecondsRemaining, setTrackSecondsRemaining] = useState(PLAYLIST_TRACK_SECONDS);
  const [profileSkillOffset, setProfileSkillOffset] = useState(0);
  const cassetteStackRef = useRef(null);
  const flipFrameRef = useRef([]);
  const entrySwitchTimerRef = useRef(null);

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
        projectImage: "Project Loop",
        uploadLater: "Upload image later",
        showFront: "show front",
        showProjectImage: "show project image",
        showIntroduction: "show introduction",
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
        projectImage: "项目演示",
        uploadLater: "稍后上传图片",
        showFront: "显示正面",
        showProjectImage: "显示项目图片",
        showIntroduction: "显示个人介绍",
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
        accent: "#ffb000",
        url: profile.github,
        imageUrl: "",
        detailsTitle: profile.name,
        detailsSummary: hero.summary,
        bullets: [
          profile.location,
          profile.email,
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
        backTape: {
          title: locale === "en" ? "Kaiwen Liu / Introduction" : "Kaiwen Liu / 个人介绍",
          side: "B",
          log: "00",
          field: "MENG",
          scene: "02",
          note:
            locale === "en"
              ? "MEng graduate from Imperial College London with production experience across blockchain infrastructure, AI tooling, and cross-platform applications."
              : "帝国理工学院 MEng 毕业生，拥有区块链基础设施、AI 工具和跨平台应用的生产环境经验。",
          spec: "IMPERIAL COLLEGE LONDON",
          meta: "PROFILE / 2026",
        },
      },
      ...profile.projects.map((project, index) => ({
        type: "project",
        number: String(index + 1).padStart(2, "0"),
        title: (project.playlistName || project.name).toUpperCase(),
        subtitle: project.stack.toUpperCase(),
        accent: ["#34d399", "#fb7185", "#60a5fa", "#fbbf24"][index] || "#60a5fa",
        url: project.github || profile.github,
        liveUrl: project.liveUrl,
        imageUrl: resolveAssetUrl(project.image),
        detailsTitle: project.name,
        detailsSummary: project.summary[locale],
        bullets: project.bullets[locale],
        tape: {
          title: project.cassetteName || (project.name.length > 28 ? `${project.name.slice(0, 28)}...` : project.name),
          side: String.fromCharCode(65 + index),
          log: String(index + 1).padStart(2, "0"),
          field: project.stack.split(",")[0].replace(".js", "").replace(".JS", "").slice(0, 8).toUpperCase(),
          scene: String(project.stack.split(",").length).padStart(2, "0"),
          note:
            locale === "en"
              ? [
                  "real-time agent evals.",
                  "prediction market signals.",
                  "object memory interface.",
                  "circuit sim, rebuilt lean.",
                ][index] || project.summary[locale]
              : [
                  "实时 agent 评测。",
                  "预测市场信号面板。",
                  "对象记忆交互界面。",
                  "轻量重构电路模拟器。",
                ][index] || project.summary[locale],
          spec: project.stack.toUpperCase(),
          meta: ["14:22", "08:45", "09:30", "11:15"][index] || "06:30",
        },
      })),
    ],
    [hero.eyebrow, hero.summary, locale],
  );

  const selectedPlaylistItem = playlist[selectedEntry];
  const displayedPlaylistItem = playlist[displayedEntry];
  const incomingPlaylistItem = incomingEntry === null ? null : playlist[incomingEntry];
  const allStackCards = useMemo(() => buildStackCards(selectedPlaylistItem, locale), [locale, selectedPlaylistItem]);
  const profileSkillPageCount = Math.ceil(allStackCards.length / 4);
  const profileSkillPage = Math.floor(profileSkillOffset / 4);
  const stackCards = useMemo(() => {
    if (selectedPlaylistItem.type !== "profile") {
      return allStackCards;
    }

    return Array.from({ length: Math.min(4, allStackCards.length) }, (_, index) =>
      allStackCards[(profileSkillOffset + index) % allStackCards.length],
    );
  }, [allStackCards, profileSkillOffset, selectedPlaylistItem.type]);
  const filteredSkills = [...profile.skills.languages, ...profile.skills.technologies].filter((item) =>
    item.toLowerCase().includes(search.toLowerCase()),
  );
  const logs = [
    profile.experience[0],
    profile.experience[1],
    profile.experience[2],
  ];
  const tapeDetails = displayedPlaylistItem.tape;
  const isCassetteLocked = cassettePhase !== "idle" || isEntrySwitchPreparing;

  const setCassetteSide = (showBack) => {
    flipFrameRef.current.forEach((frame) => window.cancelAnimationFrame(frame));
    flipFrameRef.current = [];

    if (showBack) {
      setIsCassetteFlipPreparing(false);
      setIsCassetteBackSettled(false);
      setIsCassetteFlipped(true);
      return;
    }

    if (isCassetteBackSettled) {
      // Restore the true 180deg pose for one painted frame before rotating to A.
      // This prevents React/browser batching from skipping the visible flip.
      setIsCassetteFlipPreparing(true);
      setIsCassetteBackSettled(false);
      const prepareFrame = window.requestAnimationFrame(() => {
        const flipFrame = window.requestAnimationFrame(() => {
          setIsCassetteFlipped(false);
          setIsCassetteFlipPreparing(false);
          flipFrameRef.current = [];
        });
        flipFrameRef.current.push(flipFrame);
      });
      flipFrameRef.current.push(prepareFrame);
      return;
    }

    setIsCassetteFlipPreparing(false);
    setIsCassetteFlipped(false);
  };

  useEffect(() => () => {
    flipFrameRef.current.forEach((frame) => window.cancelAnimationFrame(frame));
    window.clearTimeout(entrySwitchTimerRef.current);
  }, []);

  useEffect(() => {
    if (selectedEntry === displayedEntry) {
      return undefined;
    }

    setIsCassetteBackSettled(false);
    setIsCassetteFlipPreparing(false);
    setIsEntrySwitchPreparing(false);
    setIsCassetteFlipped(false);
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
      setFlipCounter(4);
      setCassettePhase("idle");
    }, REEL_SLOWDOWN_MS + CASSETTE_EJECT_MS + CASSETTE_INSERT_MS + CASSETTE_SETTLE_MS);

    return () => {
      window.clearTimeout(ejectTimer);
      window.clearTimeout(swapTimer);
      window.clearTimeout(doneTimer);
      window.clearTimeout(cleanupTimer);
    };
  }, [selectedEntry]);

  useEffect(() => {
    if (!isPlaying || isCassetteLocked || selectedEntry !== displayedEntry) {
      return undefined;
    }

    const flipTimer = window.setTimeout(() => {
      if (flipCounter >= 4) {
        setFlipCounter(0);
        setCassetteSide(!isCassetteFlipped);
        return;
      }

      setFlipCounter((counter) => counter + 1);
    }, 1000);

    return () => window.clearTimeout(flipTimer);
  }, [displayedEntry, flipCounter, isCassetteBackSettled, isCassetteFlipped, isCassetteLocked, isPlaying, selectedEntry]);

  useEffect(() => {
    setIsCassetteBackSettled(false);

    if (!isCassetteFlipped || isCassetteLocked) {
      return undefined;
    }

    const settleTimer = window.setTimeout(() => {
      setIsCassetteBackSettled(true);
    }, CASSETTE_FLIP_MS);

    return () => window.clearTimeout(settleTimer);
  }, [isCassetteFlipped, isCassetteLocked]);

  useEffect(() => {
    if (selectedPlaylistItem.type !== "profile" || allStackCards.length <= 4) {
      setProfileSkillOffset(0);
      return undefined;
    }

    const skillTimer = window.setInterval(() => {
      setProfileSkillOffset((offset) => (offset + 4 >= allStackCards.length ? 0 : offset + 4));
    }, 5000);

    return () => window.clearInterval(skillTimer);
  }, [allStackCards.length, selectedPlaylistItem.type]);

  const togglePlayback = () => {
    if (isCassetteLocked) {
      return;
    }

    if (isPlaying) {
      setIsPlaying(false);
      setCassetteSide(true);
      setShowPlayPopup(true);
      return;
    }

    setIsPlaying(true);
    setCassetteSide(false);
    setShowPlayPopup(false);
  };

  const changeEntry = (nextIndex) => {
    if (
      isCassetteLocked
      || nextIndex < 0
      || nextIndex >= playlist.length
      || nextIndex === selectedEntry
    ) {
      return;
    }

    setMobileSidebarOpen(false);

    if (isCassetteFlipped) {
      setIsEntrySwitchPreparing(true);
      setFlipCounter(0);
      setCassetteSide(false);
      entrySwitchTimerRef.current = window.setTimeout(() => {
        entrySwitchTimerRef.current = null;
        setSelectedEntry(nextIndex);
      }, CASSETTE_FLIP_MS + 80);
      return;
    }

    setSelectedEntry(nextIndex);
  };

  useEffect(() => {
    setTrackSecondsRemaining(PLAYLIST_TRACK_SECONDS);
  }, [selectedEntry]);

  useEffect(() => {
    if (!isPlaying || isCassetteLocked || selectedEntry !== displayedEntry) {
      return undefined;
    }

    const countdownTimer = window.setInterval(() => {
      setTrackSecondsRemaining((seconds) => Math.max(0, seconds - 1));
    }, 1000);

    return () => window.clearInterval(countdownTimer);
  }, [displayedEntry, isCassetteLocked, isPlaying, selectedEntry]);

  useEffect(() => {
    if (
      trackSecondsRemaining !== 0
      || !isPlaying
      || isCassetteLocked
      || selectedEntry !== displayedEntry
    ) {
      return;
    }

    changeEntry((selectedEntry + 1) % playlist.length);
  }, [displayedEntry, isCassetteLocked, isPlaying, playlist.length, selectedEntry, trackSecondsRemaining]);

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
                  <a
                    className="status-social-link"
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    title="GitHub"
                  >
                    <SocialIcon type="github" />
                  </a>
                  <a
                    className="status-social-link"
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                  >
                    <SocialIcon type="linkedin" />
                  </a>
                  <a
                    className="status-cv-link"
                    href={resolveAssetUrl(profile.cv)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={locale === "en" ? "Open CV PDF" : "打开简历 PDF"}
                    title={locale === "en" ? "Open CV" : "打开简历"}
                  >
                    CV
                  </a>
                </div>
              </header>

              <section className="cassette-stage">
                <div className={`cassette-shell ${cassettePhase}`}>
                  <div className="cassette-glow" style={{ "--accent": (incomingPlaylistItem || displayedPlaylistItem).accent }} />
                  <div className="cassette-stack" ref={cassetteStackRef}>
                    <Cassette
                      tapeDetails={tapeDetails}
                      accent={displayedPlaylistItem.accent}
                      spinning={isPlaying && !isCassetteLocked}
                      dictionary={dictionary}
                      className={`cassette-current ${cassettePhase === "ejecting" ? "is-ejecting" : ""}`}
                      flipped={isCassetteFlipped}
                      imageUrl={displayedPlaylistItem.imageUrl}
                      backTapeDetails={displayedPlaylistItem.backTape}
                      experienceEntries={displayedPlaylistItem.type === "profile" ? profile.experience : []}
                      locale={locale}
                      interactive={!isCassetteLocked}
                      onActivate={togglePlayback}
                      backSettled={isCassetteBackSettled}
                      flipPreparing={isCassetteFlipPreparing}
                    />
                    {incomingPlaylistItem && (
                      <Cassette
                        tapeDetails={incomingPlaylistItem.tape}
                        accent={incomingPlaylistItem.accent}
                        spinning={false}
                        dictionary={dictionary}
                        className={`cassette-incoming ${cassettePhase === "inserting" ? "is-inserting" : ""}`}
                        imageUrl={incomingPlaylistItem.imageUrl}
                      />
                    )}
                  </div>
                </div>
              </section>

              <SelectedInfo
                item={selectedPlaylistItem}
                locale={locale}
                dictionary={dictionary}
                className="mobile-project-info"
                as="section"
              />

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

                <div
                  key={`${selectedPlaylistItem.number}-${selectedPlaylistItem.type === "profile" ? profileSkillOffset : "static"}`}
                  className="skill-grid skill-grid-motion"
                  style={{ "--skill-count": 4 }}
                >
                  {stackCards.map((card) => (
                    <SkillCard
                      key={`${selectedPlaylistItem.number}-${card.title}`}
                      title={card.title}
                      subtitle={card.subtitle}
                      accent={card.accent}
                      active={card.active}
                    />
                  ))}
                  {selectedPlaylistItem.liveUrl && (
                    <SkillCard
                      title={locale === "en" ? "PROJECT" : "项目"}
                      subtitle={locale === "en" ? "Open Live Site" : "打开在线站点"}
                      accent="#f5f5f5"
                      href={selectedPlaylistItem.liveUrl}
                    />
                  )}
                </div>
                {selectedPlaylistItem.type === "profile" && profileSkillPageCount > 1 && (
                  <div className="skill-page-dots" aria-label={locale === "en" ? "Skill card sets" : "技能卡组"}>
                    {Array.from({ length: profileSkillPageCount }, (_, page) => (
                      <button
                        key={page}
                        type="button"
                        className={`skill-page-dot ${page === profileSkillPage ? "active" : ""}`}
                        onClick={() => setProfileSkillOffset(page * 4)}
                        aria-label={locale === "en" ? `Show skill set ${page + 1}` : `显示第 ${page + 1} 组技能`}
                        aria-current={page === profileSkillPage ? "true" : undefined}
                      />
                    ))}
                  </div>
                )}
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
                className={`playlist-item ${selectedEntry === index ? "active" : ""} ${isCassetteLocked ? "is-locked" : ""}`}
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
                <span className={`playlist-time ${selectedEntry === index && isPlaying ? "is-counting" : ""}`}>
                  {formatTrackTime(selectedEntry === index ? trackSecondsRemaining : PLAYLIST_TRACK_SECONDS)}
                </span>
              </button>
            ))}
          </div>

          <SelectedInfo
            item={selectedPlaylistItem}
            locale={locale}
            dictionary={dictionary}
            className="selected-project"
          />
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
          <button type="button" className="transport-button icon-transport" onClick={() => changeEntry((selectedEntry - 1 + playlist.length) % playlist.length)} disabled={isCassetteLocked}>
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
            <button
              type="button"
              className="play-button"
              onClick={togglePlayback}
              disabled={isCassetteLocked}
              aria-label={isPlaying ? "Pause and hold cassette back" : "Resume cassette playback"}
            >
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
            onClick={() => changeEntry((selectedEntry + 1) % playlist.length)}
            disabled={isCassetteLocked}
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
