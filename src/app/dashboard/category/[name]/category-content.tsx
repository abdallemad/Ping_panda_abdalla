"use client";
import EmptyCategoryState from "@/components/dashboard/empty-category";
import { NumericFieldSumCards } from "@/components/numeric-fileds-cards";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { EventCategory } from "@/generated/prisma";
import useCreateTable from "@/hooks/use-create-table";
import useGetCategoryEvents from "@/hooks/use-get-category-events";
import useNumericFields from "@/hooks/use-numeric-fields";
import { flexRender } from "@tanstack/react-table";
import { BarChart } from "lucide-react";
import { useState } from "react";

interface Props {
  hasEvents: boolean;
  category: EventCategory;
}

function CategoryContent({ hasEvents: initialHasEvents, category }: Props) {
  const [activeTap, setActiveTap] = useState<"today" | "month" | "week">(
    "today"
  );
  const { pollingData, data, isFetching } = useGetCategoryEvents({
    categoryName: category.name,
    initialHasEvents,
    activeTap,
  });
  const numericFieldsSum = useNumericFields({ data });
  const { columns, table } = useCreateTable({
    data,
    categoryName: category.name,
  });
  if (!pollingData.hasEvents)
    return <EmptyCategoryState categoryName={category.name} />;

  return (
    <div className="space-y-6">
      <Tabs
        value={activeTap}
        onValueChange={(value) =>
          setActiveTap(value as "today" | "month" | "week")
        }
      >
        <TabsList className="mb-2">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTap}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            <Card className="border-2 border-brand-700">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <p className="text-sm/6 font-medium">Total Events</p>
                <BarChart className="size-4 text-muted-foreground" />
              </div>

              <div>
                <p className="text-2xl font-bold">{data?.eventsCount || 0}</p>
                <p className="text-xs/5 text-muted-foreground">
                  Events{" "}
                  {activeTap === "today"
                    ? "today"
                    : activeTap === "week"
                    ? "this week"
                    : "this month"}
                </p>
              </div>
            </Card>
            <NumericFieldSumCards
              numericFieldSums={numericFieldsSum}
              activeTap={activeTap}
            />
          </div>
        </TabsContent>
      </Tabs>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="w-full flex flex-col gap-4">
            <h1 className="main-heading text-3xl text-pretty">
              Events overview
            </h1>
          </div>
        </div>
        {/* Table */}
        <Card contentClassName="px-6 py-4">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {isFetching ? (
                [...Array(5)].map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default CategoryContent;
