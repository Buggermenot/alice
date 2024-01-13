import { useQueryClient as useReactQueryClient } from "react-query";

import { qidInterceptor } from "../utils/axios";

import { useQID } from "./use-qid";

export function useQueryClient() {
  const { qid } = useQID();
  const queryClient = useReactQueryClient();

  qidInterceptor(qid);

  return queryClient;
}
