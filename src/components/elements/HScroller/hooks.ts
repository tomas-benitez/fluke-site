import { useRef } from "react";

export const useHScrollerControls = () => {
  const hScrollerRef = useRef<HTMLDivElement>();

  const handleNext = () => {
    if (
      hScrollerRef.current.scrollLeft >
      hScrollerRef.current.scrollWidth - (hScrollerRef.current.offsetWidth + 10)
    ) {
      hScrollerRef.current.scrollLeft = 0;
      return;
    }
    hScrollerRef.current.scrollLeft += hScrollerRef.current.offsetWidth * 0.75;
  };

  const handlePrev = () => {
    if (hScrollerRef.current.scrollLeft === 0) {
      hScrollerRef.current.scrollLeft = 100000;
      return;
    }
    hScrollerRef.current.scrollLeft -= hScrollerRef.current.offsetWidth * 0.75;
  };

  return {
    ref: hScrollerRef,
    handleNext,
    handlePrev,
  };
};
