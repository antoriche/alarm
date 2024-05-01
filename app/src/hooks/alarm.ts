import { useQuery } from "react-query";
import { Alarm } from "shared/Alarm";
import getAPI from "../services/api";

export const useAlarms = () =>
  useQuery(["alarms"], async (): Promise<Alarm[]> => {
    const api = await getAPI();
    const { data } = await api.get<Alarm[]>("/alarms");
    return data;
  });
