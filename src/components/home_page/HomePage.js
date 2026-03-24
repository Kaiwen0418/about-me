import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { projData } from "../../data/data";
import { getProjectLocale, uiText } from "../../data/translations";
import { useDevice } from "../../utils/DeviceContext";
import { useLanguage } from "../../utils/LanguageContext";

const customStyles = {
  spreadCanvas: {
    position: "relative",
    width: "100vw",
    minHeight: "100vh",
    background: "linear-gradient(90deg, transparent 49.9%, rgba(244,244,244,0.15) 50%, transparent 50.1%)",
    isolation: "isolate",
  },
  mapLines: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 0,
  },
  displayText: {
    position: "absolute",
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontWeight: 900,
    textTransform: "uppercase",
    lineHeight: 0.85,
    letterSpacing: "-0.04em",
    color: "#F4F4F4",
    whiteSpace: "nowrap",
    zIndex: 10,
  },
  tKaiwen: {
    top: "12vh",
    left: "8vw",
    fontSize: "14vw",
    mixBlendMode: "screen",
  },
  tLiu: {
    top: "24vh",
    left: "24vw",
    fontSize: "14vw",
    mixBlendMode: "difference",
  },
  tRole: {
    top: "40vh",
    left: "40vw",
    fontSize: "4vw",
    letterSpacing: "-0.02em",
    fontWeight: 800,
    mixBlendMode: "screen",
  },
  bioCluster: {
    position: "absolute",
    top: "55vh",
    left: "8vw",
    width: "320px",
    zIndex: 10,
  },
  bioText: {
    fontFamily: "'Courier Prime', monospace",
    fontSize: "0.85rem",
    lineHeight: 1.5,
    color: "#888888",
    marginBottom: "2rem",
    textAlign: "justify",
  },
  bioStrong: {
    color: "#F4F4F4",
    fontWeight: "normal",
  },
  node: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "#F4F4F4",
    color: "#090909",
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontWeight: 900,
    fontSize: "0.65rem",
    letterSpacing: 0,
    flexShrink: 0,
    transition: "transform 0.2s ease",
    cursor: "pointer",
  },
  label: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.65rem",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "#F4F4F4",
    marginLeft: "0.75rem",
  },
  techScatter: {
    position: "relative",
    marginTop: "2rem",
    height: "150px",
  },
  techItem: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
  },
  projectCluster: {
    position: "absolute",
    width: "max-content",
    maxWidth: "280px",
  },
  projectMedia: {
    position: "relative",
    zIndex: 6,
    isolation: "isolate",
  },
  projectMeta: {
    position: "relative",
    zIndex: 24,
  },
  projImgWrapper: {
    width: "160px",
    height: "100px",
    marginBottom: "1rem",
    position: "relative",
    zIndex: 2,
    overflow: "hidden",
    filter: "grayscale(100%) contrast(200%) brightness(80%)",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  projImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    imageRendering: "pixelated",
  },
  projHeader: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    marginBottom: "0.5rem",
    zIndex: 30,
  },
  projDesc: {
    position: "relative",
    zIndex: 2,
    fontFamily: "'Courier Prime', monospace",
    fontSize: "0.75rem",
    lineHeight: 1.4,
    color: "#888888",
    marginLeft: "calc(24px + 0.75rem)",
  },
  systemBadge: {
    position: "absolute",
    top: "38vh",
    left: "30vw",
    width: "80px",
    height: "80px",
    border: "1px solid rgba(244, 244, 244, 0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.5rem",
    textAlign: "center",
    lineHeight: 1.2,
    color: "#888888",
    borderRadius: "50%",
    background: "#090909",
    zIndex: 15,
  },
  pixelAvatar: {
    width: "32px",
    height: "32px",
    backgroundImage: `url("${process.env.PUBLIC_URL}/images/pixel-avatar.svg")`,
    backgroundSize: "cover",
    imageRendering: "pixelated",
  },
};

const projectPositions = {
  "1": { top: "15vh", left: "61vw" },
  "2": { top: "40vh", left: "75vw" },
  "3": { top: "65vh", left: "45vw" },
  "4": { top: "75vh", left: "70vw" },
  "5": { top: "52vh", left: "58vw" },
};

const mobileCardStyles = [
  {},
  { marginTop: "2rem" },
  {},
  { marginTop: "1.5rem" },
  {},
];

const setFallbackImage = (event, fallbackSrc) => {
  if (!fallbackSrc || event.currentTarget.dataset.fallbackApplied === "true") {
    return;
  }

  event.currentTarget.dataset.fallbackApplied = "true";
  event.currentTarget.src = fallbackSrc;
};

const ProjImgOverlay = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
      pointerEvents: "none",
    }}
  />
);

const Node = ({ children, style }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...customStyles.node,
        transform: hovered ? "scale(1.2)" : "scale(1)",
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
};

const ProjectCard = ({ project, style, isMobile = false }) => {
  const clusterStyle = isMobile
    ? {
        position: "relative",
        display: "block",
        width: "100%",
        maxWidth: "none",
        padding: "0.9rem",
        border: "1px solid rgba(244,244,244,0.14)",
        background: "rgba(255,255,255,0.02)",
      }
    : { ...customStyles.projectCluster, ...style };

  const imageWrapperStyle = isMobile
    ? {
        ...customStyles.projImgWrapper,
        width: "100%",
        height: "140px",
        marginBottom: "0.85rem",
      }
    : customStyles.projImgWrapper;

  const metaStyle = isMobile
    ? {
        ...customStyles.projectMeta,
      }
    : { ...customStyles.projectMeta, ...project.metaStyle };

  const descStyle = isMobile
    ? {
        ...customStyles.projDesc,
        marginLeft: 0,
        marginTop: "0.4rem",
        fontSize: "0.8rem",
      }
    : customStyles.projDesc;

  return (
    <Link to={`/project/${project.id}`} style={clusterStyle}>
      <div style={customStyles.projectMedia}>
        <div style={imageWrapperStyle}>
          <img
            src={project.demoImage}
            alt={project.demoAlt}
            style={customStyles.projImg}
            onError={(event) => setFallbackImage(event, project.demoImageFallback)}
          />
          <ProjImgOverlay />
        </div>
      </div>
      <div style={metaStyle}>
        <div style={customStyles.projHeader}>
          <div style={{ position: "relative", zIndex: 2 }}>
            <Node>{project.nodeNum}</Node>
          </div>
          <div
            style={{
              ...customStyles.label,
              mixBlendMode: "difference",
              position: "relative",
              zIndex: 30,
              color: "#ffffff",
              display: "inline-block",
              fontSize: isMobile ? "0.72rem" : customStyles.label.fontSize,
            }}
          >
            {project.shortTitle}
          </div>
        </div>
        <div style={descStyle}>{project.homeDescription}</div>
      </div>
    </Link>
  );
};

const TechItem = ({ style, num, label }) => (
  <div style={{ ...customStyles.techItem, ...style }}>
    <Node>{num}</Node>
    <span style={customStyles.label}>{label}</span>
  </div>
);

const MobileHome = ({ projects, language }) => {
  const text = uiText[language].home;

  return (
  <div style={{ position: "relative", minHeight: "100vh", padding: "5.5rem 1.25rem 3rem" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.25rem" }}>
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.66rem",
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: "#8f8b84",
        }}
      >
        {text.selectedWork}
      </div>
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "1px solid rgba(244,244,244,0.14)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ ...customStyles.pixelAvatar, width: "16px", height: "16px" }} />
      </div>
    </div>

    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.82 }}>
      <div style={{ fontSize: "clamp(3.5rem, 20vw, 4.8rem)" }}>Kaiwen</div>
      <div style={{ marginLeft: "18%", fontSize: "clamp(3.5rem, 20vw, 4.8rem)" }}>Liu</div>
      <div style={{ marginTop: "0.9rem", marginLeft: "11%", fontSize: "1rem", letterSpacing: "-0.02em" }}>{text.role}</div>
    </div>

    <div style={{ marginTop: "1.75rem", maxWidth: "28rem" }}>
      <div style={customStyles.bioText}>{text.bio}</div>
    </div>

    <div
      style={{
        marginTop: "2rem",
        marginLeft: "-1.25rem",
        marginRight: "-1.25rem",
        padding: "0 1.25rem",
        overflowX: "auto",
        display: "flex",
        gap: "0.9rem",
        scrollSnapType: "x proximity",
        scrollbarWidth: "none",
      }}
    >
      {projects.map((project, index) => (
        <div
          key={project.id}
          style={{
            ...mobileCardStyles[index],
            flex: "0 0 85%",
            maxWidth: "20rem",
            scrollSnapAlign: "start",
          }}
        >
          <ProjectCard project={project} isMobile />
        </div>
      ))}
    </div>

    <div
      style={{
        marginTop: "1.2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.58rem",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "#8f8b84",
        }}
      >
        {text.swipeHint}
      </div>
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.58rem",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "#f4f2ea",
        }}
      >
        {text.records}
      </div>
    </div>
  </div>
  );
};

const HomePage = () => {
  const isMobileDevice = useDevice();
  const { language } = useLanguage();
  const text = uiText[language].home;

  const projects = useMemo(
    () => [
      {
        id: "1",
        ...projData["1"],
        nodeNum: "01",
        shortTitle: getProjectLocale(1, language).homeShortTitle,
        homeDescription: getProjectLocale(1, language).homeDescription,
        demoAlt: getProjectLocale(1, language).demoAlt,
        metaStyle: {
          transform: "translate(-26px, -8px)",
        },
      },
      {
        id: "2",
        ...projData["2"],
        nodeNum: "02",
        shortTitle: getProjectLocale(2, language).homeShortTitle,
        homeDescription: getProjectLocale(2, language).homeDescription,
        demoAlt: getProjectLocale(2, language).demoAlt,
        metaStyle: {
          transform: "translate(-20px, -6px)",
        },
      },
      {
        id: "3",
        ...projData["3"],
        nodeNum: "03",
        shortTitle: getProjectLocale(3, language).homeShortTitle,
        homeDescription: getProjectLocale(3, language).homeDescription,
        demoAlt: getProjectLocale(3, language).demoAlt,
        metaStyle: {
          transform: "translate(-14px, -4px)",
        },
      },
      {
        id: "4",
        ...projData["4"],
        nodeNum: "04",
        shortTitle: getProjectLocale(4, language).homeShortTitle,
        homeDescription: getProjectLocale(4, language).homeDescription,
        demoAlt: getProjectLocale(4, language).demoAlt,
        metaStyle: {
          transform: "translate(-18px, -8px)",
        },
      },
      {
        id: "5",
        ...projData["5"],
        nodeNum: "05",
        shortTitle: getProjectLocale(5, language).homeShortTitle,
        homeDescription: getProjectLocale(5, language).homeDescription,
        demoAlt: getProjectLocale(5, language).demoAlt,
        metaStyle: {
          transform: "translate(-22px, -6px)",
        },
      },
    ],
    [language]
  );

  if (isMobileDevice) {
    return <MobileHome projects={projects} language={language} />;
  }

  return (
    <div style={customStyles.spreadCanvas}>
      <svg style={customStyles.mapLines} viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M 58 15 C 66 15, 66 40, 75 40"
          stroke="rgba(244,244,244,0.15)"
          strokeWidth="1px"
          fill="none"
          strokeDasharray="4 4"
        />
        <line
          x1="15"
          y1="75"
          x2="45"
          y2="65"
          stroke="rgba(244,244,244,0.15)"
          strokeWidth="1px"
          strokeDasharray="4 4"
        />
        <line
          x1="75"
          y1="45"
          x2="70"
          y2="75"
          stroke="rgba(244,244,244,0.15)"
          strokeWidth="1px"
          strokeDasharray="4 4"
        />
        <line
          x1="34"
          y1="42"
          x2="45"
          y2="42"
          stroke="rgba(244,244,244,0.15)"
          strokeWidth="1px"
          strokeDasharray="4 4"
        />
        <line
          x1="85"
          y1="0"
          x2="85"
          y2="100"
          stroke="rgba(244,244,244,0.15)"
          strokeWidth="1px"
          strokeDasharray="2 10"
        />
      </svg>

      <div style={{ ...customStyles.displayText, ...customStyles.tKaiwen }}>Kaiwen</div>
      <div style={{ ...customStyles.displayText, ...customStyles.tLiu }}>Liu</div>
      <div style={{ ...customStyles.displayText, ...customStyles.tRole }}>{text.role}</div>

      <div style={customStyles.systemBadge}>
        <div style={customStyles.pixelAvatar} />
      </div>

      <div style={customStyles.bioCluster}>
        <div style={customStyles.bioText}>{text.bio}</div>

        <div style={customStyles.techScatter}>
          <TechItem style={{ top: 0, left: 0 }} num="05" label={text.tech[0]} />
          <TechItem style={{ top: "30px", left: "80px" }} num="06" label={text.tech[1]} />
          <TechItem style={{ top: "70px", left: "20px" }} num="07" label={text.tech[2]} />
          <TechItem style={{ top: "110px", left: "100px" }} num="08" label={text.tech[3]} />
        </div>
      </div>

      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} style={projectPositions[project.id]} />
      ))}
    </div>
  );
};

export default HomePage;
