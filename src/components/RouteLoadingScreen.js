import React, { useEffect, useMemo, useState } from "react";

const pixelMap = [
  0, 0, 1, 1, 1, 1, 0, 0,
  0, 1, 0, 0, 0, 0, 1, 0,
  0, 1, 0, 0, 0, 0, 1, 0,
  1, 1, 0, 0, 0, 0, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 1,
  0, 1, 0, 0, 0, 0, 1, 0,
  0, 0, 1, 0, 0, 1, 0, 0,
  0, 0, 0, 1, 1, 0, 0, 0,
];

const getLoadingConfig = (routePath) => {
  if (routePath.startsWith("/project/")) {
    return {
      version: "SYS.LOAD.PROJECT",
      status: "Opening Project File",
      ready: "FILE.READY",
      lines: [
        "> INITIALIZING CORE... OK",
        "> LOCATING PROJECT INDEX... FOUND",
        "> MOUNTING DETAIL RECORD... DONE",
        "> LOADING SCREENSHOTS / METADATA...",
        "> ANALYZING LOW-LEVEL INTERFACES...",
        "> PARSING REACT / NODE / PYTHON / F#",
        "> STAGING PRESENTATION LAYER...",
        "> PROJECT FILE AUTHENTICATED.",
      ],
    };
  }

  if (routePath.startsWith("/project")) {
    return {
      version: "SYS.LOAD.ARCHIVE",
      status: "Opening Project Archive",
      ready: "ARCHIVE.READY",
      lines: [
        "> INITIALIZING CORE... OK",
        "> MOUNTING PROJECT ARCHIVE... DONE",
        "> INDEXING SELECTED WORK... 100%",
        "> RECONCILING STACK / YEAR / STATUS...",
        "> PREPARING EXPANDED RECORDS...",
        "> LOADING DEMO VISUALS...",
        "> STAGING ARCHIVE TABLE...",
        "> ARCHIVE ACCESS AUTHENTICATED.",
      ],
    };
  }

  if (routePath.startsWith("/about")) {
    return {
      version: "SYS.LOAD.DOSSIER",
      status: "Opening Dossier",
      ready: "DOSSIER.READY",
      lines: [
        "> INITIALIZING CORE... OK",
        "> MOUNTING PROFILE LOG... DONE",
        "> LOADING EDUCATION TIMELINE... 100%",
        "> PARSING SYSTEM ATTRIBUTES...",
        "> RESOLVING VISUAL / TECHNICAL SIGNALS...",
        "> ESTABLISHING CONTEXT BUFFER...",
        "> STAGING DOSSIER PANELS...",
        "> DOSSIER AUTHENTICATED.",
      ],
    };
  }

  return {
    version: "SYS.INIT.V1.0.42",
    status: "Booting System",
    ready: "SYS.READY",
    lines: [
      "> INITIALIZING CORE... OK",
      "> LOADING KERNEL ASSETS... 100%",
      "> MOUNTING HOME INDEX... DONE",
      "> ANALYZING LOW-LEVEL INTERFACES...",
      "> ESTABLISHING FULL-STACK PROTOCOLS...",
      "> PARSING REACT / NODE / PYTHON / F#",
      "> DEPLOYING VISUAL BUFFER...",
      "> EXECUTION AUTHENTICATED.",
    ],
  };
};

const RouteLoadingScreen = ({ visible, routePath, coverChrome = false }) => {
  const [percent, setPercent] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const [pixelCount, setPixelCount] = useState(0);
  const [readyVisible, setReadyVisible] = useState(false);
  const [blinkState, setBlinkState] = useState(true);
  const config = useMemo(() => getLoadingConfig(routePath), [routePath]);

  const litPixelIndexes = useMemo(
    () => pixelMap.map((value, index) => (value === 1 ? index : null)).filter((value) => value !== null),
    []
  );

  useEffect(() => {
    if (!visible) {
      return undefined;
    }

    setPercent(0);
    setLineCount(0);
    setPixelCount(0);
    setReadyVisible(false);
    setBlinkState(true);

    const percentTimer = window.setInterval(() => {
      setPercent((current) => {
        if (current >= 100) {
          window.clearInterval(percentTimer);
          return 100;
        }

        return Math.min(100, current + Math.floor(Math.random() * 18 + 6));
      });
    }, 110);

    const lineTimer = window.setInterval(() => {
      setLineCount((current) => {
        if (current >= config.lines.length) {
          window.clearInterval(lineTimer);
          return config.lines.length;
        }

        return current + 1;
      });
    }, 90);

    const pixelTimer = window.setInterval(() => {
      setPixelCount((current) => {
        if (current >= litPixelIndexes.length) {
          window.clearInterval(pixelTimer);
          return litPixelIndexes.length;
        }

        return current + 1;
      });
    }, 45);

    const readyTimer = window.setTimeout(() => {
      setReadyVisible(true);
    }, 620);

    const blinkTimer = window.setInterval(() => {
      setBlinkState((current) => !current);
    }, 420);

    return () => {
      window.clearInterval(percentTimer);
      window.clearInterval(lineTimer);
      window.clearInterval(pixelTimer);
      window.clearTimeout(readyTimer);
      window.clearInterval(blinkTimer);
    };
  }, [config.lines.length, litPixelIndexes.length, visible]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-[#090909] transition-opacity duration-300 ${
        coverChrome ? "z-[40]" : "z-[15]"
      }`}
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E\")",
      }}
      aria-hidden={!visible}
    >
      <div className="absolute left-8 top-8 text-[0.65rem] uppercase tracking-[0.15em] text-[#444] md:left-8 md:top-8">
        {config.version}
      </div>

      <div className="flex w-[400px] max-w-[calc(100vw-2.5rem)] flex-col gap-8">
        <div
          className="mx-auto grid h-16 w-16 grid-cols-8 grid-rows-8 gap-[2px]"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.35s ease" }}
        >
          {pixelMap.map((value, index) => {
            const litIndex = litPixelIndexes.indexOf(index);
            const visiblePixel = value === 1 && litIndex > -1 && litIndex < pixelCount;

            return (
              <div
                key={index}
                style={{
                  background: value === 1 ? "#F4F4F4" : "transparent",
                  opacity: visiblePixel ? 1 : 0,
                  transition: "opacity 0.08s ease",
                }}
              />
            );
          })}
        </div>

        <div className="h-[120px] overflow-hidden text-[0.7rem] uppercase tracking-[0.05em] text-[#444]">
          {config.lines.map((line, index) => {
            const active = index === config.lines.length - 1;
            const shown = index < lineCount;

            return (
              <span
                key={line}
                className="block leading-[1.6]"
                style={{
                  opacity: shown ? 1 : 0,
                  transform: shown ? "translateY(0)" : "translateY(5px)",
                  transition: "opacity 0.12s ease, transform 0.12s ease",
                  color: active && shown ? "#F4F4F4" : "#444444",
                }}
              >
                {line}
              </span>
            );
          })}
        </div>

        <div className="flex flex-col gap-2">
          <div className="relative h-[2px] w-full bg-[rgba(244,244,244,0.15)]">
            <div
              className="absolute left-0 top-0 h-full bg-[#F4F4F4] transition-[width] duration-150 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="flex justify-between text-[0.6rem] uppercase tracking-[0.08em] text-[#444]">
            <span>{config.status}</span>
            <span>{percent}%</span>
          </div>
        </div>

        <div
          className="text-center font-['Inter',-apple-system,sans-serif] text-[0.8rem] font-black uppercase tracking-[0.2em]"
          style={{
            opacity: readyVisible ? 1 : 0,
            color: blinkState ? "#F4F4F4" : "transparent",
            transition: "opacity 0.3s ease",
          }}
        >
          {config.ready}
        </div>
      </div>
    </div>
  );
};

export default RouteLoadingScreen;
