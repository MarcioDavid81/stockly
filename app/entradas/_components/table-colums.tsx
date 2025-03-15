"use client";

import { Button } from "@/app/_components/ui/button";
import { formatCurrency } from "@/app/_helpers/currency";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { EntriesDto } from "@/app/_data-access/entries/get-entries";
import EntriesTableDropdownMenu from "./table-dropdown-menu";

export const entrieTableColumns: ColumnDef<EntriesDto>[] = [
  {
    accessorKey: "productName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Produto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "totalProducts",
    header: "Quantidade",
  },
  {
    accessorKey: "totalAmount",
    header: "Valor Total",
    cell: ({
      row: {
        original: { totalAmount },
      },
    }) => formatCurrency(totalAmount),
  },
  {
    header: "Data",
    cell: ({
      row: {
        original: { date },
      },
    }) => <span>{new Date(date).toLocaleDateString("pt-BR")}</span>,
  },
  {
    header: "Ações",
    cell: ({row: {original: entrie}}) => (
      <EntriesTableDropdownMenu entrie={entrie} />
    ),
  },
];
