import { useState, useEffect } from "react";

export const breakpoints = {
  sm: "(min-width: 576px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 992px)",
  xl: "(min-width: 1200px)",
  "2xl": "(min-width: 1400px)",
};

export const useMatchMedia = (mediaQuery) => {
  const [queryIsMatched, setQueryIsMatched] = useState(false);

  useEffect(() => {
    const handleResize = (e) => {
      setQueryIsMatched(e.matches);
    };

    let matchMedia = window.matchMedia(mediaQuery);

    matchMedia.addEventListener("change", handleResize);
    setQueryIsMatched(matchMedia.matches);

    return () => {
      if (matchMedia) matchMedia.removeEventListener("change", handleResize);
    };
  }, [mediaQuery]);

  return [queryIsMatched];
};

export const useCurrentBreakpoint = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState("xs");

  useEffect(() => {
    const matchMediaCollection = [
      { breakpoint: "sm", matchMedia: window.matchMedia(breakpoints["sm"]) },
      { breakpoint: "md", matchMedia: window.matchMedia(breakpoints["md"]) },
      { breakpoint: "lg", matchMedia: window.matchMedia(breakpoints["lg"]) },
      { breakpoint: "xl", matchMedia: window.matchMedia(breakpoints["xl"]) },
      { breakpoint: "2xl", matchMedia: window.matchMedia(breakpoints["2xl"]) },
    ];

    const handleResize = (e) => {
      for (const matchMedia of matchMediaCollection) {
        if (e.matches) {
          setCurrentBreakpoint(matchMedia.breakpoint);
          break;
        }
      }
    };

    for (const matchMedia of matchMediaCollection) {
      matchMedia.matchMedia.addEventListener("change", handleResize);
    }

    for (const matchMedia of matchMediaCollection) {
      if (matchMedia.matchMedia.matches) {
        setCurrentBreakpoint(matchMedia.breakpoint);
        break;
      }
    }

    return () => {
      for (const matchMedia of matchMediaCollection) {
        matchMedia.matchMedia.removeEventListener("change", handleResize);
      }
    };
  }, []);

  return [currentBreakpoint];
};
