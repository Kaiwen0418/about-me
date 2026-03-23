import React from "react";
import { uiText } from "../data/translations";
import { useLanguage } from "../utils/LanguageContext";

const customStyles = {
  terminalContainer: {
    position: "relative",
    width: "min(900px, calc(100vw - 8rem))",
    height: "600px",
    margin: "0 auto",
    border: "1px solid rgba(244, 244, 244, 0.15)",
    background: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  terminalHeader: {
    padding: "0.75rem 1rem",
    borderBottom: "1px solid rgba(244, 244, 244, 0.15)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.6rem",
    color: "#666666",
    background: "rgba(255, 255, 255, 0.02)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  terminalScrollArea: {
    position: "relative",
    flex: 1,
    padding: "2rem",
    overflowY: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(244, 244, 244, 0.15) transparent",
    fontFamily: "'Courier Prime', monospace",
  },
  cmdLine: {
    marginBottom: "1rem",
    fontSize: "0.85rem",
    lineHeight: 1.6,
    color: "#F4F4F4",
  },
  prompt: {
    color: "#666666",
  },
  output: {
    color: "#666666",
    marginTop: "0.25rem",
    marginBottom: "1.5rem",
    paddingLeft: "1rem",
    fontSize: "0.85rem",
    lineHeight: 1.6,
  },
  treeView: {
    fontFamily: "'Courier Prime', monospace",
    fontSize: "0.8rem",
    margin: "1.5rem 0",
    lineHeight: 1.4,
    color: "#666666",
  },
  treePath: {
    color: "#F4F4F4",
    marginTop: "1rem",
    display: "block",
  },
  treeLine: {
    display: "flex",
    justifyContent: "space-between",
    color: "#333333",
    whiteSpace: "pre",
  },
  treeLineActive: {
    display: "flex",
    justifyContent: "space-between",
    color: "#666666",
    whiteSpace: "pre",
  },
  treeSize: {
    color: "#333333",
    fontSize: "0.7rem",
    fontFamily: "'Space Mono', monospace",
  },
  timelineItem: {
    position: "relative",
    paddingLeft: "1.5rem",
    marginBottom: "1.5rem",
    borderLeft: "1px dashed rgba(244, 244, 244, 0.15)",
  },
  timelineDot: {
    position: "absolute",
    left: "-4px",
    top: "5px",
    width: "7px",
    height: "7px",
    background: "#F4F4F4",
  },
  year: {
    color: "#F4F4F4",
    fontWeight: "bold",
    marginBottom: "0.2rem",
    display: "block",
  },
  inst: {
    fontSize: "0.75rem",
    textTransform: "uppercase",
    color: "#F4F4F4",
    letterSpacing: "0.08em",
  },
  scanline: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.1) 50%)",
    backgroundSize: "100% 4px",
    pointerEvents: "none",
    zIndex: 5,
  },
  exportButton: {
    display: "inline-flex",
    alignItems: "center",
    marginTop: "2rem",
    padding: "0.8rem 1.5rem",
    border: "1px solid #F4F4F4",
    color: "#F4F4F4",
    background: "transparent",
    textDecoration: "none",
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    transition: "all 0.3s ease",
  },
};

const skillGroups = [
  {
    path: "./skills:",
    rows: [
      ["├── c_cpp/", "4096 KB", true],
      ["├── javascript/", "4096 KB", true],
      ["├── python/", "4096 KB", true],
      ["└── hardware/", "4096 KB", true],
    ],
  },
  {
    path: "./skills/c_cpp:",
    rows: [
      ["├── std_lib.h", "85.0%"],
      ["└── assembly.s", "40.0%"],
    ],
  },
  {
    path: "./skills/javascript:",
    rows: [
      ["├── react_hooks.js", "75.0%"],
      ["└── node_express.js", "65.0%"],
    ],
  },
  {
    path: "./skills/python:",
    rows: [["└── data_pipeline.py", "90.0%"]],
  },
  {
    path: "./skills/hardware:",
    rows: [["└── fpga_hdl.v", "55.0%"]],
  },
];

const Cursor = () => (
  <span
    className="cursor-blink"
    style={{
      display: "inline-block",
      width: "8px",
      height: "15px",
      background: "#F4F4F4",
      verticalAlign: "middle",
      marginLeft: "4px",
    }}
  />
);

const TimelineItem = ({ year, inst, description }) => (
  <div style={customStyles.timelineItem}>
    <div style={customStyles.timelineDot} />
    <span style={customStyles.year}>{year}</span>
    <span style={customStyles.inst}>{inst}</span>
    <p>{description}</p>
  </div>
);

const AboutPage = () => {
  const { language } = useLanguage();
  const text = uiText[language].about;

  return (
    <div className="flex min-h-screen items-center justify-center px-8 py-24">
      <section style={customStyles.terminalContainer}>
        <div style={customStyles.scanline} />
        <div style={customStyles.terminalHeader}>
          <span>{text.terminal}</span>
          <span>{text.location}</span>
        </div>

        <div style={customStyles.terminalScrollArea}>
          <div style={customStyles.cmdLine}>
            <span style={customStyles.prompt}>&gt; </span>{text.biography}
          </div>
          <div style={customStyles.output}>{text.biographyText}</div>

          <div style={customStyles.cmdLine}>
            <span style={customStyles.prompt}>&gt; </span>{text.education}
          </div>
          <div style={customStyles.output}>
            {text.timeline.map((item) => (
              <TimelineItem
                key={item.year}
                year={item.year}
                inst={item.inst}
                description={item.description}
              />
            ))}
          </div>

          <div style={customStyles.cmdLine}>
            <span style={customStyles.prompt}>&gt; </span>{text.skills}
          </div>
          <div style={customStyles.treeView}>
            {skillGroups.map((group) => (
              <React.Fragment key={group.path}>
                <span style={customStyles.treePath}>{group.path}</span>
                {group.rows.map(([label, value, active]) => (
                  <div
                    key={`${group.path}-${label}`}
                    style={active ? customStyles.treeLineActive : customStyles.treeLine}
                  >
                    <span>{label}</span>
                    <span style={customStyles.treeSize}>{value}</span>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>

          <div style={customStyles.cmdLine}>
            <span style={customStyles.prompt}>&gt; </span>{text.export}
            <Cursor />
          </div>

          <a href="mailto:kaiwenliu0418@gmail.com" style={customStyles.exportButton}>
            {text.manifesto}
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
