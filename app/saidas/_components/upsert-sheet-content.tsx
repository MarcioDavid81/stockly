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
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
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
import TableDropdownMenu from "./table-dropdown-menu";
import { Product } from "@prisma/client";

const formSchema = z.object({
  // destinationId: z.string().uuid({
  //   message: "O destino é obrigatório.",
  // }),
  productId: z.string().uuid({
    message: "O produto é obrigatório.",
  }),
  quantity: z.coerce.number().int().positive(),
});

type FormSchema = z.infer<typeof formSchema>;

interface UpsertSheetContentProps {
  // destinations: Destination[];
  // destinationOptions: ComboboxOption[];
  products: Product[];
  productOptions: ComboboxOption[];
}

// interface SelectedDestination {
//   id: string;
//   name: string;
// }

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const UpsertSheetContent = ({
  // destinations,
  // destinationOptions,
  products,
  productOptions,
}: UpsertSheetContentProps) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  );
  // const [selectedDestinations, setSelectedDestinations] = useState<SelectedDestination[]>(
  //   [],
  // )

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // destinationId: "",
      productId: "",
      quantity: 0,
    },
  });

  const onSubmit = (data: FormSchema) => {
    // const selectedDestination = destinations.find(
    //   (destination) => destination.id === data.destinationId,
    // );
    // if (!selectedDestination) return;
    // setSelectedDestinations((currentDestination) => {
    //   const existedDestination = currentDestination.find(
    //     (destination) => destination.id === selectedDestination.id,
    //   );
    //   if (existedDestination) {
    //     return currentDestination.map((destination) => {
    //       if (destination.id === selectedDestination.id) {
    //         return {
    //           ...destination,
    //           name: destination.name,
    //         };
    //       }
    //       return destination;
    //     });
    //   }
    //   return [
    //     ...currentDestination,
    //     {
    //       ...selectedDestination,
    //       name: selectedDestination.name,
    //     },
    //   ];
    // });

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
          {/* <FormField
            control={form.control}
            name="destinationId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Destino</FormLabel>
                <FormControl>
                  <Combobox
                    options={destinationOptions}
                    {...field}
                    placeholder="Selecione o destino do produto..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
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
                <TableDropdownMenu product={product} onDelete={onDelete} />
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
    </SheetContent>
  );
};

export default UpsertSheetContent;
