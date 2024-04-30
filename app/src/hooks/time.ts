import { useEffect, useState } from "react";

/**
 *
 * @returns {Date} The current time
 */
export const useNow = (): Date => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return currentTime;
};
