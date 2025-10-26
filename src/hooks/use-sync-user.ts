'use client';

import { syncUserAction } from "@/actions/sync-user";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";


function useSyncUser() {
  const searchParams = useSearchParams();
  const intent = searchParams.get("intent");
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["user-welcome-page"],
    queryFn: async () => await syncUserAction(),
    refetchInterval(query) {
      if (query.state.data?.isSynced) return false;
      else return 1000;
    },
  });
  useEffect(() => {
    if (data?.isSynced)
      router.push(intent ? `/dashboard?intent=${intent}` : "/dashboard");
  }, [data, router, intent]);
}

export default useSyncUser
