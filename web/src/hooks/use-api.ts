import { useQuery, UseQueryOptions } from "react-query";

import { qidInterceptor } from "../utils/axios";

import { useQID } from "./use-qid";

export function useAPI<
  TQueryKey extends [string, Record<string, unknown>?],
  TQueryFnData,
  TError,
  TData = TQueryFnData
>(
  queryKey: TQueryKey,
  fetcher: () => Promise<TQueryFnData>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
  >
) {
  const { qid } = useQID();
  qidInterceptor(qid);

  return useQuery({
    queryKey,
    queryFn: fetcher,
    ...options,
  });
}
