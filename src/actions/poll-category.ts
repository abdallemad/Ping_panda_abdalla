'use server';

import { CATEGORY_NAME_VALIDATOR } from "@/lib/category-validator";
import { getAuth } from "./get-user";
import db from "@/lib/db";

export const pollCategory = async (rawName: string) => {
  const user = await getAuth();
  const data = CATEGORY_NAME_VALIDATOR.safeParse(rawName);
  if (!data.success) throw new Error("please provide correct name");
  const name = data.data;
  const category = await db.eventCategory.findUnique({
    where: {
      name_userId: {
        name,
        userId: user.id,
      },
    },
    include: { _count: { select: { events: true } } },
  });
  if (!category) throw new Error("category not found");
  const hasEvents = category._count.events > 0;
  return { hasEvents };
};
