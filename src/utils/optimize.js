import { useEffect, useState } from "react";

export default function useOptimizeAB(experimentId, defaultVariant) {
  const [variant, setVariant] = useState();
  useEffect(() => {
    window.dataLayer.push({ event: "optimize.activate" });
    let interval = setInterval(() => {
      if (window.google_optimize !== undefined) {
        const variant = window.google_optimize.get(experimentId);
        setVariant(Number(variant !== undefined ? variant : defaultVariant));
        clearInterval(interval);
      } else {
        setVariant(defaultVariant);
      }
    }, 100);
  }, [experimentId, defaultVariant]);
  return variant;
}
