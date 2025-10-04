import { insertQuickEventCategoryAction } from "@/actions/insert-quick-event-category";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useInsertQuickCategories() {
  const queryClient = useQueryClient();

  const { mutate: insertQuickStartCategory, isPending } = useMutation({
    mutationFn: async () => await insertQuickEventCategoryAction(),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["user-event-categories"],
      });
    },
  });
  return {
    insertQuickStartCategory,
    isPending
  }
}

export default useInsertQuickCategories;
