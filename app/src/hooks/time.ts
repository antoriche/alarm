import dayjs from "dayjs";
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

export const useToday = (): Date => {
  const [today, setToday] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const newDate = new Date();
      if (!dayjs(newDate).isSame(today, "day")) {
        setToday(newDate);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return dayjs(today).startOf("day").toDate();
};
