import { deleteEventCategoryAction, getEventCategoriesAction } from "@/actions/get-delete-events-category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

function useGetAndDeleteCategory() {
  const queryClient = useQueryClient();
  const [deletingCategory, setDeletingCategory] = useState<string | null>(null);
  const { data: categories, isPending: isEventCategoriesLoading } = useQuery({
    queryKey: ["user-event-categories"],
    queryFn: async () => await getEventCategoriesAction(),
  });

  const { mutate: deleteEventCategory, isPending: isDeleting } = useMutation({
    mutationFn: async (categoryName: string) =>
      await deleteEventCategoryAction(categoryName),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["user-event-categories"],
      });
      setDeletingCategory(null);
    },
  });

  return {
    deleteEventCategory,
    isDeleting,
    categories,
    isEventCategoriesLoading,
    deletingCategory,
    setDeletingCategory
  };
}

export default useGetAndDeleteCategory;
