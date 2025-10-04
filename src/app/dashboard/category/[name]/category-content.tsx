import EmptyCategoryState from "@/components/dashboard/empty-category";
import type { EventCategory } from "@/generated/prisma";
import React from "react";

interface Props {
  hasEvents: boolean;
  category: EventCategory;
}

function CategoryContent({ hasEvents: initialHasEvents, category }: Props) {


  
  if (true) return <EmptyCategoryState categoryName={category.name} />;
  return <div></div>;
}

export default CategoryContent;
