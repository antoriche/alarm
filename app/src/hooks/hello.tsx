import { UseQueryResult, useQuery } from "react-query";
import getAPI from "../services/api";
import { HelloRequest, HelloResponse } from "shared/Hello";
import { queryClient } from "../App";
import rpc from "../services/rpc";

const getHello_ = async (name: string): Promise<HelloResponse> => {
  const api = await getAPI();
  const res = await api.get<HelloResponse>("/hello", { params: { name } as HelloRequest });
  return res.data;
};

export const useHello = (name): UseQueryResult<HelloResponse> => useQuery(["hello", name], () => getHello_(name), {});
export const getHello = (name: string): Promise<HelloResponse> => queryClient.fetchQuery(["hello", name], () => getHello_(name));

export const useSayHello = (name: string): UseQueryResult<string> =>
  useQuery(["sayHello", name], () => {
    return rpc.sayHello(name);
  });
