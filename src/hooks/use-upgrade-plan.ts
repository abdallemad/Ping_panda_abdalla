'use client';

import { getUsageAction, upgradePlanAction } from '@/actions/upgrad-plan-action';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

function useUpgradePlan() {
  const router = useRouter();
  const { mutate: createCheckoutSession } = useMutation({
    mutationFn: async () => await upgradePlanAction(),
    onSuccess: (data) => {
      if (data?.url) router.push(data.url);
    },
  });
  const { data: usageData } = useQuery({
    queryKey: ["usage"],
    queryFn: async () => {
      return await getUsageAction();
    },
  });
  return {
    createCheckoutSession,
    usageData
  }
}

export default useUpgradePlan
