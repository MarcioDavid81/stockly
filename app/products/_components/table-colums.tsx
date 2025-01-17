"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CircleIcon } from "lucide-react";
import ProductTableDropdownMenu from "./table-dropdown-menu";
import { Button } from "@/app/_components/ui/button";

const getStatusLabel = (status: string) => {
  if (status === "IN_STOCK") {
    return "Em Estoque";
  }
  return "Fora de Estoque";
};

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
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
    accessorKey: "price",
    header: "Valor Unitário",
    cell: (row) => {
      const product = row.row.original;
      return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(product.price));
    }
  },
  {
    accessorKey: "stock",
    header: "Estoque",
    cell: (row) => {
      const product = row.row.original;
      return product.stock.toLocaleString("pt-BR");
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const product = row.row.original;
      const label = getStatusLabel(product.status);
      return (
        <Badge
          className="gap-2"
          variant={label === "Em Estoque" ? "default" : "outline"}
        >
          <CircleIcon
            size={14}
            className={`${label === "Em Estoque" ? "fill-primary-foreground" : "fill-destructive-foreground"}`}
          />
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => <ProductTableDropdownMenu product={row.row.original} />,
  },
];
