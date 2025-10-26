import { pollCategory } from "@/actions/poll-category";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function usePollCategory(categoryName: string) {
  const { data } = useQuery({
    queryKey: ["category", categoryName, "hasEvents"],
    queryFn: async () => await pollCategory(categoryName),
    refetchInterval(query) {
      return query.state.data?.hasEvents ? false : 5000;
    },
  });
  const router = useRouter();
  const hasEvents = data?.hasEvents;
  useEffect(() => {
    if (hasEvents) router.refresh();
  }, [hasEvents, router]);
  const codeSnip = `await fetch('https://ping-panda-abdalla.vercel.app/api/events', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      name: '${categoryName}',
      fields: {
        field1: 'value1', // for example: user id
        field2: 'value2' // for example: user email
      }
    })
  })`;

  return { codeSnip };
}

export default usePollCategory;
