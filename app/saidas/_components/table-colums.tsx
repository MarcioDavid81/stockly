"use client";

import { Button } from "@/app/_components/ui/button";
import { ExitsDto } from "@/app/_data-access/exits/get-exits";
import { formatCurrency } from "@/app/_helpers/currency";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

export const exitTableColumns: ColumnDef<ExitsDto>[] = [
  {
    accessorKey: "productName",
    header: "Produto",
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
        }
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
    cell: () => (
      <Button variant="ghost">
        <MoreHorizontalIcon size={16} />
      </Button>
    ),
  },
];
