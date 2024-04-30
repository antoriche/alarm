import { useQuery } from "react-query";

export const useAlarms = () =>
  useQuery(["alarms"], async () => {
    return [
      {
        id: 1,
        name: "Réveil",
        time: "08:00",
        active: true,
      },
      {
        id: 2,
        time: "13:00",
        active: false,
      },
      {
        id: 3,
        time: "14:00",
        active: true,
      },
    ];
  });
