"use server";

import { EVENT_CATEGORY_VALIDATION } from "@/lib/category-validator";
import db from "@/lib/db";
import { parseColor } from "@/lib/utils";
import { getAuth } from "./get-user";

export const createEventCategoryAction = async (
  data: EVENT_CATEGORY_VALIDATION
) => {
  const user = await getAuth();

  // TODO: ADD PAID PLANS

  const eventCategory = await db.eventCategory.create({
    data: {
      name: data.name.toLowerCase(),
      color: parseColor(data.color),
      emoji: data.emoji,
      userId: user.id,
    },
  });
  console.log("data");
  return eventCategory;
};
