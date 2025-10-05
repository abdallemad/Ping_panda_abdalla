import { $Enums } from "@/generated/prisma";
import { JsonValue } from "@/generated/prisma/runtime/library";
import { isAfter, isToday, startOfMonth, startOfWeek } from "date-fns";
import React, { useMemo } from "react";

function useNumericFields({
  data,
}: {
  data:
    | {
        events: {
          name: string;
          id: string;
          userId: string;
          createdAt: Date;
          updatedAt: Date;
          formattedMessage: string;
          fields: JsonValue;
          deliveryStatus: $Enums.DeliveryStatus;
          eventCategoryId: string;
        }[];
        eventsCount: number;
        uniqueFieldCount: number;
      }
    | undefined;
}) {
  const numericFieldSums = useMemo(() => {
    if (!data?.events || data.events.length === 0) return {};

    const sums: Record<
      string,
      {
        total: number;
        thisWeek: number;
        thisMonth: number;
        today: number;
      }
    > = {};

    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 0 });
    const monthStart = startOfMonth(now);

    data.events.forEach((event) => {
      const eventDate = event.createdAt;

      Object.entries(JSON.parse(event.fields as string) as object).forEach(
        ([field, value]) => {
          if (typeof value === "number") {
            if (!sums[field]) {
              sums[field] = { total: 0, thisWeek: 0, thisMonth: 0, today: 0 };
            }

            sums[field].total += value;

            if (
              isAfter(eventDate, weekStart) ||
              eventDate.getTime() === weekStart.getTime()
            ) {
              sums[field].thisWeek += value;
            }

            if (
              isAfter(eventDate, monthStart) ||
              eventDate.getTime() === monthStart.getTime()
            ) {
              sums[field].thisMonth += value;
            }

            if (isToday(eventDate)) {
              sums[field].today += value;
            }
          }
        }
      );
    });

    return sums;
  }, [data?.events]);

  return numericFieldSums
}

export default useNumericFields;
