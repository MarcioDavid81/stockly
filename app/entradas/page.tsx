import { auth } from "@clerk/nextjs/server";
import Sidebar from "../_components/sidebar";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import CreateEntrieButton from "./_components/create-entrie-button";
import { getProducts } from "../_data-access/product/get-products";
import { ComboboxOption } from "../_components/ui/combobox";
import { DataTable } from "../_components/ui/data-table";
import { entrieTableColumns } from "./_components/table-colums";
import { getEntries } from "../_data-access/entries/get-entries";

export const metadata: Metadata = {
  title: "Entradas",
  description: "Veja um resumo das suas finanças.",
};

const EntriesPage = async () => {
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

    /* Função para listar as entradas */
    const entries = await getEntries();

  return (
    <>
      <Sidebar />
      <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8">
        <div className="flex w-full items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500">
              Gestão de Produtos
            </span>
            <h2 className="text-xl font-semibold">Entradas</h2>
          </div>
          <CreateEntrieButton
            products={products}
            productOptions={productOptions}
          />
        </div>
        <DataTable columns={entrieTableColumns} data={JSON.parse(JSON.stringify(entries))}
          pageSize={4} />  
      </div>
    </>
  );
};

export default EntriesPage;
