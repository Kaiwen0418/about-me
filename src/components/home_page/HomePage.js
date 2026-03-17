import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { projData } from "../../data/data";
import { useDevice } from "../../utils/DeviceContext";

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
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23F4F4F4' d='M2 0h4v1H2zm-1 1h1v1H1zm5 0h1v1H6zM1 2h1v1H1zm5 0h1v1H6zM0 3h2v1H0zm6 0h2v1H6zM0 4h1v1H0zm2 4h1V4H2zm3 4h1V4H5zm2-4h1v1H7zM1 5h1v1H1zm5 0h1v1H6zM2 6h1v1H2zm3 0h1v1H5z'/%3E%3C/svg%3E\")",
    backgroundSize: "cover",
    imageRendering: "pixelated",
  },
};

const projectPositions = {
  "1": { top: "15vh", left: "61vw" },
  "2": { top: "40vh", left: "75vw" },
  "3": { top: "65vh", left: "45vw" },
  "4": { top: "75vh", left: "70vw" },
};

const mobileCardStyles = [
  {},
  { marginTop: "2rem" },
  {},
  { marginTop: "1.5rem" },
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

const ProjectCard = ({ project, style }) => (
  <Link to={`/project/${project.id}`} style={{ ...customStyles.projectCluster, ...style }}>
    <div style={customStyles.projectMedia}>
      <div style={customStyles.projImgWrapper}>
        <img
          src={project.demoImage}
          alt={project.demoAlt}
          style={customStyles.projImg}
          onError={(event) => setFallbackImage(event, project.demoImageFallback)}
        />
        <ProjImgOverlay />
      </div>
    </div>
    <div style={{ ...customStyles.projectMeta, ...project.metaStyle }}>
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
          }}
        >
          {project.shortTitle}
        </div>
      </div>
      <div style={customStyles.projDesc}>{project.homeDescription}</div>
    </div>
  </Link>
);

const TechItem = ({ style, num, label }) => (
  <div style={{ ...customStyles.techItem, ...style }}>
    <Node>{num}</Node>
    <span style={customStyles.label}>{label}</span>
  </div>
);

const MobileHome = ({ projects }) => (
  <div style={{ position: "relative", minHeight: "100vh", padding: "6rem 1.25rem 7rem" }}>
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.85 }}>
      <div style={{ fontSize: "4.25rem" }}>Kaiwen</div>
      <div style={{ marginLeft: "20%", fontSize: "4.25rem" }}>Liu</div>
      <div style={{ marginTop: "1rem", marginLeft: "12%", fontSize: "1.25rem", letterSpacing: "-0.02em" }}>Full-Stack Dev.</div>
    </div>

    <div style={{ marginTop: "2rem", maxWidth: "28rem" }}>
      <div style={customStyles.bioText}>
        User profile located. <strong style={customStyles.bioStrong}>Imperial College London</strong> graduate,
        holding an EIE MEng degree. Operating at the intersection of low-level systems and front-end execution.
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem", marginTop: "2rem" }}>
      {projects.map((project, index) => (
        <div key={project.id} style={mobileCardStyles[index]}>
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  </div>
);

const HomePage = () => {
  const isMobileDevice = useDevice();

  const projects = useMemo(
    () => [
      {
        id: "1",
        ...projData["1"],
        nodeNum: "01",
        shortTitle: "Circuit Simulator",
        homeDescription:
          "Web-based logic circuit simulation tool. Real-time component evaluation and state rendering.",
        demoAlt: "Circuit board macro",
        metaStyle: {
          transform: "translate(-26px, -8px)",
        },
      },
      {
        id: "2",
        ...projData["2"],
        nodeNum: "02",
        shortTitle: "CNC System",
        homeDescription:
          "Advanced scheduling algorithm for CNC machine operations, optimizing routing and minimizing downtime.",
        demoAlt: "Machinery parts",
        metaStyle: {
          transform: "translate(-20px, -6px)",
        },
      },
      {
        id: "3",
        ...projData["3"],
        nodeNum: "03",
        shortTitle: "Embedded Sec",
        homeDescription:
          "Hardware-level security protocol implementation for embedded IoT devices.",
        demoAlt: "Abstract data flow",
        metaStyle: {
          transform: "translate(-14px, -4px)",
        },
      },
      {
        id: "4",
        ...projData["4"],
        nodeNum: "04",
        shortTitle: "Math > Braille",
        homeDescription:
          "Optical character recognition pipeline designed specifically to translate complex mathematical formulas into Braille.",
        demoAlt: "Grid pattern",
        metaStyle: {
          transform: "translate(-18px, -8px)",
        },
      },
    ],
    []
  );

  if (isMobileDevice) {
    return <MobileHome projects={projects} />;
  }

  return (
    <div style={customStyles.spreadCanvas}>
      <svg style={customStyles.mapLines}>
        <path
          d="M 58vw 15vh C 66vw 15vh, 66vw 40vh, 75vw 40vh"
          stroke="rgba(244,244,244,0.15)"
          strokeWidth="1px"
          fill="none"
          strokeDasharray="4 4"
        />
        <line
          x1="15vw"
          y1="75vh"
          x2="45vw"
          y2="65vh"
          stroke="rgba(244,244,244,0.15)"
          strokeWidth="1px"
          strokeDasharray="4 4"
        />
        <line
          x1="75vw"
          y1="45vh"
          x2="70vw"
          y2="75vh"
          stroke="rgba(244,244,244,0.15)"
          strokeWidth="1px"
          strokeDasharray="4 4"
        />
        <line
          x1="34vw"
          y1="42vh"
          x2="45vw"
          y2="42vh"
          stroke="rgba(244,244,244,0.15)"
          strokeWidth="1px"
          strokeDasharray="4 4"
        />
        <line
          x1="85vw"
          y1="0"
          x2="85vw"
          y2="100vh"
          stroke="rgba(244,244,244,0.15)"
          strokeWidth="1px"
          strokeDasharray="2 10"
        />
      </svg>

      <div style={{ ...customStyles.displayText, ...customStyles.tKaiwen }}>Kaiwen</div>
      <div style={{ ...customStyles.displayText, ...customStyles.tLiu }}>Liu</div>
      <div style={{ ...customStyles.displayText, ...customStyles.tRole }}>Full-Stack Dev.</div>

      <div style={customStyles.systemBadge}>
        <div style={customStyles.pixelAvatar} />
      </div>

      <div style={customStyles.bioCluster}>
        <div style={customStyles.bioText}>
          User profile located. <strong style={customStyles.bioStrong}>Imperial College London</strong> graduate,
          holding an EIE MEng degree. Documented achievements include multiple high-level implementations across
          hardware and software boundaries. Operating at the intersection of low-level systems and front-end execution.
        </div>

        <div style={customStyles.techScatter}>
          <TechItem style={{ top: 0, left: 0 }} num="05" label="React.js" />
          <TechItem style={{ top: "30px", left: "80px" }} num="06" label="Node/Exp" />
          <TechItem style={{ top: "70px", left: "20px" }} num="07" label="Python 3" />
          <TechItem style={{ top: "110px", left: "100px" }} num="08" label="C / C++" />
        </div>
      </div>

      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} style={projectPositions[project.id]} />
      ))}
    </div>
  );
};

export default HomePage;
