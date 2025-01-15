import { auth } from "@clerk/nextjs/server";
import Sidebar from "../_components/sidebar";

import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getProducts } from "../_data-access/product/get-products";
import { ComboboxOption } from "../_components/ui/combobox";
import CreateExitButton from "./_components/create-exit-button";

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
  /* Função para listar os produtos do banco de dados */
  const products = await getProducts();

  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
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
          <CreateExitButton
            products={products}
            productOptions={productOptions}
          />
        </div>
      </div>
    </>
  );
};

export default ExitsPage;
