// import { PlusIcon } from "lucide-react";
// import { Button } from "../_components/ui/button";
import { DataTable } from "../_components/ui/data-table";
import { productTableColumns } from "./_components/table-colums";
import { getProducts } from "../_data-access/product/get-products";
import CreateProductButton from "./_components/create-product-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produtos",
  description: "Veja um resumo das suas finanças.",
};

const ProductsPage = async () => {
  
  const products = await getProducts();

  return (
    <div className="m-8 rounded-lg w-full space-y-8 bg-white p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de Produtos
          </span>
          <h2 className="text-xl font-semibold">Produtos</h2>
        </div>
        <CreateProductButton />
      </div>
      <DataTable columns={productTableColumns} data={JSON.parse(JSON.stringify(products))} />
    </div>
  );
};

export default ProductsPage;
