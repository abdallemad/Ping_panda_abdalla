import { BarChart } from "lucide-react";
import { Card } from "./ui/card";

export const NumericFieldSumCards = ({
  numericFieldSums,
  activeTap,
}: {
  activeTap: "today" | "month" | "week";
  numericFieldSums: Record<
    string,
    {
      total: number;
      thisWeek: number;
      thisMonth: number;
      today: number;
    }
  >;
}) => {
  if (Object.keys(numericFieldSums).length === 0) return null;

  return Object.entries(numericFieldSums).map(([field, sums]) => {
    const relevantSum =
      activeTap === "today"
        ? sums.today
        : activeTap === "week"
        ? sums.thisWeek
        : sums.thisMonth;

    return (
      <Card key={field}>
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <p className="text-sm/6 font-medium">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </p>
          <BarChart className="size-4 text-muted-foreground" />
        </div>

        <div>
          <p className="text-2xl font-bold">{relevantSum.toFixed(2)}</p>
          <p className="text-xs/5 text-muted-foreground">
            {activeTap === "today"
              ? "today"
              : activeTap === "week"
              ? "this week"
              : "this month"}
          </p>
        </div>
      </Card>
    );
  });
};
