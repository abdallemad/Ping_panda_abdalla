import { getEventsByCategoryName } from "@/actions/get-events-by-category-name";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

function useGetCategoryEvents({
  categoryName,
  initialHasEvents,
  activeTap,
}: {
  categoryName: string;
  initialHasEvents: boolean;
  activeTap: "today" | "month" | "week";
}) {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const [pagination, setPagination] = useState({
    pageIndex: page - 1,
    pageSize: limit,
  });
  const { data: pollingData } = useQuery({
    queryKey: ["category", categoryName, "hasEvents"],
    initialData: { hasEvents: initialHasEvents },
    queryFn() {
      return { hasEvents: initialHasEvents };
    },
  });

  const { data, isFetching } = useQuery({
    queryKey: [
      "events",
      categoryName,
      pagination.pageIndex,
      pagination.pageSize,
      activeTap,
    ],
    queryFn: async () =>
      await getEventsByCategoryName({
        categoryName: categoryName,
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        timeRange: activeTap,
      }),
    refetchOnWindowFocus: false,
    enabled: pollingData.hasEvents,
  });

  return {
    pollingData,
    data,
    isFetching,
  };
}

export default useGetCategoryEvents;
