"use client";

import { Button } from "@/app/_components/ui/button";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { formatCurrency } from "@/app/_helpers/currency";
import { Product } from "@prisma/client";
import { toast } from "sonner";
import { createEntrie } from "@/app/_actions/entrie/upsert-entrie";
import UpsertEntrieTableDropdownMenu from "./upsert-table-dropdown-menu";

const formSchema = z.object({
  productId: z.string().uuid({
    message: "O produto é obrigatório.",
  }),
  quantity: z.coerce.number().int().positive(),
});

type FormSchema = z.infer<typeof formSchema>;

interface UpsertSheetContentProps {
  products: Product[];
  productOptions: ComboboxOption[];
  onSubmitSuccess: () => void;
}

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const UpsertSheetContent = ({
  products,
  productOptions,
  onSubmitSuccess,
}: UpsertSheetContentProps) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  );

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  const onSubmit = (data: FormSchema) => {
    console.log(data);

    const selectedProduct = products.find(
      (product) => product.id === data.productId,
    );
    if (!selectedProduct) return;
    setSelectedProducts((currentProducts) => {
      const existedProduct = currentProducts.find(
        (product) => product.id === selectedProduct.id,
      );
      if (existedProduct) {
        return currentProducts.map((product) => {
          if (product.id === selectedProduct.id) {
            return {
              ...product,
              quantity: product.quantity + data.quantity,
            };
          }
          return product;
        });
      }
      return [
        ...currentProducts,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ];
    });
  };

  /*Função par memorizar o valor total da entrada */
  const productsTotal = useMemo(() => {
    return selectedProducts.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0,
    );
  }, [selectedProducts]);

  /*Função para memorizar a soma total de produtos */
  const quantityTotal = useMemo(() => {
    return selectedProducts.reduce((acc, product) => acc + product.quantity, 0);
  }, [selectedProducts]);

  /*Função para excluir o produto da lista de entrada */
  const onDelete = (productId: string) => {
    setSelectedProducts((currentProducts) => {
      return currentProducts.filter((product) => product.id !== productId);
    });
  };

  /*Função para registrar a entrada */
  const onSubmitEntrie = async () => {
    try {
      await createEntrie({
        products: selectedProducts.map((product) => ({
          id: product.id,
          quantity: product.quantity,
        })),
      });
      toast.success("Entrada registrada com sucesso.");
      onSubmitSuccess();
    } catch (error) {
      toast.error("Erro ao registrar a entrada.");
    }
  };

  return (
    <SheetContent className="!max-w-[700px]">
      <SheetHeader>
        <SheetTitle>Nova Entrada</SheetTitle>
        <SheetDescription>
          Insira abaixo, as informações da entrada
        </SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form className="space-y-4 py-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Combobox
                    options={productOptions}
                    {...field}
                    placeholder="Selecione um produto..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Insira a quantidade..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full gap-2" variant="secondary">
            <PlusIcon size={20} />
            Adicionar Produto
          </Button>
        </form>
      </Form>
      <Table>
        <TableCaption>Produtos adicionados a esta entrada</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Preço Unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Valor Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                {JSON.parse(JSON.stringify(formatCurrency(product.price)))}
              </TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                {JSON.parse(
                  JSON.stringify(
                    formatCurrency(product.price * product.quantity),
                  ),
                )}
              </TableCell>
              <TableCell>
                <UpsertEntrieTableDropdownMenu
                  product={product}
                  onDelete={onDelete}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell>{quantityTotal}</TableCell>
            <TableCell>
              {JSON.parse(JSON.stringify(formatCurrency(productsTotal)))}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <SheetFooter className="pt-6">
        <Button
          className="w-full gap-2"
          variant="default"
          disabled={selectedProducts.length === 0}
          onClick={onSubmitEntrie}
        >
          <CheckIcon size={20} />
          Registrar Entrada
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpsertSheetContent;

