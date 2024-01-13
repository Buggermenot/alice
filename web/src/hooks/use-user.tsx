import { useState, useEffect, useCallback } from "react";
import { useQueryClient } from "react-query";

import { useQID } from "@/hooks/use-qid";
import { apiClient, qidInterceptor } from "@/utils/axios";

interface UserResponce {
  username: string;
  role: string;
}

export function useUser() {
  const { qid } = useQID();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<null | UserResponce>(null);

  const getUser = useCallback(async () => {
    if (!qid) return;
    qidInterceptor(qid);

    const data = await queryClient.fetchQuery(["me"], async () => {
      const res = await apiClient.get("/user/me");
      return res.data;
    });

    return data;
  }, [qid, queryClient]);

  useEffect(() => {
    (async () => {
      const data = await getUser();
      setUser(data);
    })();
  }, [qid, getUser]);

  return user;
}
