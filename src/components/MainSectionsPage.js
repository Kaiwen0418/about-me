import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomePage from "./home_page/HomePage";
import ProjDetailsPage from "./proj_page/ProjDetailsPage";
import AboutPage from "./AboutPage";

const sectionPaths = ["/", "/project", "/about"];
const WHEEL_THRESHOLD = 90;
const WHEEL_COOLDOWN_MS = 720;

const MainSectionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const sectionRefs = useRef({});
  const syncingRef = useRef(false);
  const syncTimerRef = useRef(null);
  const hasMountedRef = useRef(false);
  const wheelDeltaRef = useRef(0);
  const wheelLockRef = useRef(false);
  const wheelUnlockTimerRef = useRef(null);
  const isScrollSync = Boolean(location.state && location.state.scrollSync);

  const activePath = useMemo(() => {
    if (location.pathname.startsWith("/about")) {
      return "/about";
    }

    if (location.pathname.startsWith("/project")) {
      return "/project";
    }

    return "/";
  }, [location.pathname]);

  useLayoutEffect(() => {
    const target = sectionRefs.current[activePath];

    if (!target) {
      return undefined;
    }

    if (isScrollSync) {
      hasMountedRef.current = true;
      return undefined;
    }

    syncingRef.current = true;
    target.scrollIntoView({
      behavior: hasMountedRef.current ? "smooth" : "auto",
      block: "start",
    });

    hasMountedRef.current = true;

    window.clearTimeout(syncTimerRef.current);
    syncTimerRef.current = window.setTimeout(() => {
      syncingRef.current = false;
    }, 700);

    return () => {
      window.clearTimeout(syncTimerRef.current);
    };
  }, [activePath, isScrollSync]);

  useEffect(() => {
    const root = containerRef.current;

    if (!root) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (syncingRef.current) {
          return;
        }

        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (!visibleEntry) {
          return;
        }

        const nextPath = visibleEntry.target.getAttribute("data-path");

        if (!nextPath || nextPath === activePath) {
          return;
        }

        navigate(nextPath, {
          replace: true,
          state: { skipLoader: true, scrollSync: true },
        });
      },
      {
        root,
        threshold: [0.55, 0.7, 0.9],
      }
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [activePath, navigate]);

  useEffect(() => {
    const root = containerRef.current;

    if (!root) {
      return undefined;
    }

    const handleWheel = (event) => {
      if (window.innerWidth < 768 || syncingRef.current || wheelLockRef.current) {
        return;
      }

      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        return;
      }

      wheelDeltaRef.current += event.deltaY;

      if (Math.abs(wheelDeltaRef.current) < WHEEL_THRESHOLD) {
        event.preventDefault();
        return;
      }

      const currentIndex = sectionPaths.indexOf(activePath);
      const direction = wheelDeltaRef.current > 0 ? 1 : -1;
      const nextIndex = Math.max(0, Math.min(sectionPaths.length - 1, currentIndex + direction));

      wheelDeltaRef.current = 0;

      if (nextIndex === currentIndex) {
        event.preventDefault();
        return;
      }

      event.preventDefault();
      wheelLockRef.current = true;
      syncingRef.current = true;

      navigate(sectionPaths[nextIndex], {
        state: { skipLoader: true, scrollSync: true },
      });

      window.clearTimeout(syncTimerRef.current);
      syncTimerRef.current = window.setTimeout(() => {
        syncingRef.current = false;
      }, 700);

      window.clearTimeout(wheelUnlockTimerRef.current);
      wheelUnlockTimerRef.current = window.setTimeout(() => {
        wheelLockRef.current = false;
      }, WHEEL_COOLDOWN_MS);
    };

    root.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      root.removeEventListener("wheel", handleWheel);
      window.clearTimeout(wheelUnlockTimerRef.current);
    };
  }, [activePath, navigate]);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto overflow-x-hidden scroll-smooth"
      style={{ scrollSnapType: "y mandatory" }}
    >
      <section
        ref={(node) => {
          sectionRefs.current["/"] = node;
        }}
        data-path="/"
        className="relative min-h-screen"
        style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
      >
        <HomePage />
      </section>

      <section
        ref={(node) => {
          sectionRefs.current["/project"] = node;
        }}
        data-path="/project"
        className="relative min-h-screen"
        style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
      >
        <div className="folio-main w-full">
          <ProjDetailsPage />
        </div>
      </section>

      <section
        ref={(node) => {
          sectionRefs.current["/about"] = node;
        }}
        data-path="/about"
        className="relative min-h-screen"
        style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
      >
        <AboutPage />
      </section>
    </div>
  );
};

export default MainSectionsPage;
