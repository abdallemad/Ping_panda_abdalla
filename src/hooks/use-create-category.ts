"use client";

import { createEventCategoryAction } from "@/actions/create-event-category";
import { EVENT_CATEGORY_VALIDATION } from "@/lib/category-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

function useCreateCategory() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: createEventCategory, isPending: isCreating } = useMutation({
    mutationFn: async (data: EVENT_CATEGORY_VALIDATION) =>
      await createEventCategoryAction(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["user-event-categories"],
      });
      setIsOpen(false);
    },
  });
  const form = useForm<EVENT_CATEGORY_VALIDATION>({
    resolver: zodResolver(EVENT_CATEGORY_VALIDATION),
    defaultValues: {
      name: "",
      color: "",
      emoji: "",
    },
  });
  const handleSubmit = (data: EVENT_CATEGORY_VALIDATION) => {
    createEventCategory(data);
  };

  return {
    isOpen, 
    handleSubmit, 
    form,
    isCreating,
    setIsOpen,
    createEventCategory
  }
}

export default useCreateCategory;
