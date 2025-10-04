import EmptyCategoryState from "@/components/dashboard/empty-category";
import type { EventCategory } from "@/generated/prisma";
import React from "react";

function CategoryContent({
  hasEvents,
  category,
}: {
  hasEvents: boolean;
  category: EventCategory;
}) {
  if (true) return <EmptyCategoryState categoryName={category.name} />;
  return <div></div>;
}

export default CategoryContent;
