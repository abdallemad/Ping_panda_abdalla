import { Button } from "@/components/ui/button";
import { $Enums } from "@/generated/prisma";
import { JsonValue } from "@/generated/prisma/runtime/library";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

function useCreateTable({
  categoryName,
  data,
}: {
  categoryName: string;
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
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const [pagination, setPagination] = useState({
    pageIndex: page - 1,
    pageSize: limit,
  });
  const columns: ColumnDef<Event>[] = useMemo(() => {
    return [
      {
        accessorKey: "category",
        header: "Category",
        cell: () => <span>{categoryName || "Uncategorized"}</span>,
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Date
              <ArrowUpDown className="ml-2 size-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return new Date(row.getValue("createdAt")).toLocaleString();
        },
      },
      ...(data?.events[0]
        ? Object.keys(JSON.parse(data.events[0].fields as string) as object)
            .filter((field) => typeof field === "string") // Only include string keys
            .map((field) => ({
              accessorFn: (row: Event) => {
                const value = (
                  // @ts-expect-error:some reason ts is not happy here
                  JSON.parse(row.fields as string) as Record<string, any>
                )[field];
                // Handle nested or JSON values
                return typeof value === "object"
                  ? JSON.stringify(value, null, 2) // Convert to a string for display
                  : value || "-"; // Use the value or a fallback
              },
              header: field, // Use the key as the header
              cell: ({ row }: { row: Row<Event> }) => {
                const value = (
                  // @ts-expect-error:some reason ts is not happy here
                  JSON.parse(row.original.fields as string) as Record<
                    string,
                    any
                  >
                )[field];
                return typeof value === "object"
                  ? JSON.stringify(value, null, 2) // Display objects as JSON strings
                  : value || "-"; // Use the value or a fallback
              },
            }))
        : []),
      {
        accessorKey: "deliveryStatus",
        header: "Delivery Status",
        cell: ({ row }) => (
          <span
            className={cn("px-2 py-1 rounded-full text-xs font-semibold", {
              "bg-green-100 text-green-800":
                row.getValue("deliveryStatus") === "DELIVERED",
              "bg-red-100 text-red-800":
                row.getValue("deliveryStatus") === "FAILED",
              "bg-yellow-100 text-yellow-800":
                row.getValue("deliveryStatus") === "PENDING",
            })}
          >
            {row.getValue("deliveryStatus")}
          </span>
        ),
      },
    ];
  }, [categoryName, data?.events]);

  const table = useReactTable({
    data: data?.events || [],
    // @ts-expect-error: Typescript is being weird here
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil((data?.eventsCount || 0) / pagination.pageSize),
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  return {
    columns,
    table
  }
}

export default useCreateTable;
