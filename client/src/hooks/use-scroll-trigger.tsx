import { useEffect, useState } from "react";

interface UseScrollTriggerOptions {
  threshold?: number;
  disableHysteresis?: boolean;
}

export function useScrollTrigger(options: UseScrollTriggerOptions = {}) {
  const { threshold = 100, disableHysteresis = false } = options;
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    let previous = 0;

    const handleScroll = () => {
      const current = window.pageYOffset;
      
      if (!disableHysteresis && previous !== undefined) {
        if (current < previous) {
          setTrigger(current > threshold);
          previous = current;
          return;
        }
      }

      setTrigger(current > threshold);
      previous = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold, disableHysteresis]);

  return trigger;
}
