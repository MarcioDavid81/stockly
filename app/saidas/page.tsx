import { auth } from "@clerk/nextjs/server";
import Sidebar from "../_components/sidebar";

import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Sheet, SheetTrigger } from "../_components/ui/sheet";
import UpsertSheetContent from "./_components/upsert-sheet-content";
import { Button } from "../_components/ui/button";
import { PlusIcon } from "lucide-react";
import { getProducts } from "../_data-access/product/get-products";
import { ComboboxOption } from "../_components/ui/combobox";

export const metadata: Metadata = {
  title: "Saídas",
  description: "Veja um resumo das suas finanças.",
};

const ExitsPage = async () => {
  /* Função para redirecionar caso o usuário não esteja auntenticado */
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }
  /* Função para lista os produtos do banco de dados */
  const products = await getProducts();

  const productOptions: ComboboxOption[] = products.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  return (
    <>
      <Sidebar />
      <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8">
        <div className="flex w-full items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500">
              Gestão de Produtos
            </span>
            <h2 className="text-xl font-semibold">Saídas</h2>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <PlusIcon size={20} />
                Nova Saída
              </Button>
            </SheetTrigger>
            <UpsertSheetContent products={products} productOptions={productOptions} />
          </Sheet>
        </div>
      </div>
    </>
  );
};

export default ExitsPage;
