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
import UpsertExitTableDropdownMenu from "./upsert-table-dropdown-menu";
import { Product } from "@prisma/client";
import { createExit } from "@/app/_actions/exit/upsert-exit";
import { toast } from "sonner";

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
        /*Verifica se a quantidade de produtos adicionados é maior que a quantidade em estoque */
        const productIsOutOffStock =
          existedProduct.quantity + data.quantity > selectedProduct.stock;
        if (productIsOutOffStock) {
          form.setError("quantity", {
            message: "Quantidade indisponível em estoque.",
          });
          return currentProducts;
        }
        form.reset();
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
      /*Verifica se a quantidade de produtos adicionados é maior que a quantidade em estoque */
      const productIsOutOffStock = data.quantity > selectedProduct.stock;
      if (productIsOutOffStock) {
        form.setError("quantity", {
          message: "Quantidade indisponível em estoque.",
        });
        return currentProducts;
      }
      form.reset();
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

  /*Função par memorizar o valor total da saída */
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

  /*Função para excluir o produto da lista de saída */
  const onDelete = (productId: string) => {
    setSelectedProducts((currentProducts) => {
      return currentProducts.filter((product) => product.id !== productId);
    });
  };

  /*Função para registrar a saída */
  const onSubmitExit = async () => {
    const response = await createExit({
      products: selectedProducts.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      })),
    });
    if (response.error) {
      return toast.error(response.error);
    }
    toast.success("Saída registrada com sucesso.");
    onSubmitSuccess();
  };

  return (
    <SheetContent className="!max-w-[700px]">
      <SheetHeader>
        <SheetTitle>Nova Saída</SheetTitle>
        <SheetDescription>
          Insira abaixo, as informações da saída
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
        <TableCaption>Produtos adicionados a esta saída</TableCaption>
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
                <UpsertExitTableDropdownMenu
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
          onClick={onSubmitExit}
        >
          <CheckIcon size={20} />
          Finalizar Saída
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpsertSheetContent;
