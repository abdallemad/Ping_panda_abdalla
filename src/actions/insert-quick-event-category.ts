"use server";

import db from "@/lib/db";
import { getAuth } from "./get-user";

export const insertQuickEventCategoryAction = async () => {
  const user = await getAuth();

  const eventCategory = await db.eventCategory.createMany({
    data: [
      {
        name: "bug",
        color: 0xfdcb6e,
        emoji: "🐛",
        userId: user.id,
      },
      {
        name: "sale",
        color: 0xff6b6b,
        emoji: "🤑",
        userId: user.id,
      },
      {
        name: "question",
        color: 0x6c5ce7,
        emoji: "🤔",
        userId: user.id,
      },
    ].map((category) => ({
      ...category,
      userId: user.id,
    })),
  });
  return { success: true, data: eventCategory.count };
};
