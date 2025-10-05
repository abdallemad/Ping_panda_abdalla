"use server";

import db from "@/lib/db";
import { startOfDay, startOfMonth, startOfWeek } from "date-fns";
import { getAuth } from "./get-user";

export const getEventsByCategoryName = async ({
  categoryName:name,
  page,
  limit,
  timeRange,
}: {
  categoryName: string;
  page: number;
  limit: number;
  timeRange: "week" | "month" | "today";
}) => {
  const user = await getAuth();
  const now = new Date()
  let startDate: Date

  switch (timeRange) {
    case "today":
      startDate = startOfDay(now)
      break
    case "week":
      startDate = startOfWeek(now, { weekStartsOn: 0 })
      break
    case "month":
      startDate = startOfMonth(now)
      break
  }

  const [events, eventsCount, uniqueFieldCount] = await Promise.all([
    db.event.findMany({
      where: {
        eventCategory: { name, userId: user.id },
        createdAt: { gte: startDate },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    db.event.count({
      where: {
        eventCategory: { name, userId: user.id },
        createdAt: { gte: startDate },
      },
    }),
    db.event
      .findMany({
        where: {
          eventCategory: { name, userId: user.id },
          createdAt: { gte: startDate },
        },
        select: {
          fields: true,
        },
        distinct: ["fields"],
      })
      .then((events) => {
        const fieldNames = new Set<string>()
        events.forEach((event) => {
          Object.keys(event.fields as object).forEach((fieldName) => {
            fieldNames.add(fieldName)
          })
        })
        return fieldNames.size
      }),
  ])

  return ({
    events,
    eventsCount,
    uniqueFieldCount,
  })
};