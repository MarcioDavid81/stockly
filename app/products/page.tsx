import { DataTable } from "../_components/ui/data-table";
import { productTableColumns } from "./_components/table-colums";
import { getProducts } from "../_data-access/product/get-products";
import CreateProductButton from "./_components/create-product-button";
import { Metadata } from "next";
import Sidebar from "../_components/sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Produtos",
  description: "Veja um resumo das suas finanças.",
};

export const dynamic = "force-dynamic";

import { Decimal } from "decimal.js";

const ProductsPage = async () => {
  const products = await getProducts();

    /* Função para redirecionar caso o usuário não esteja auntenticado */
    const { userId } = await auth();
    if (!userId) {
      redirect("/");
    }

  // Convert price from number to Decimal
  const productsWithDecimalPrice = products.map((product) => ({
    ...product,
    price: new Decimal(product.price),
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
            <h2 className="text-xl font-semibold">Produtos</h2>
          </div>
          <CreateProductButton />
        </div>
        <DataTable
          columns={productTableColumns}
          data={productsWithDecimalPrice}
          pageSize={5}
        />
      </div>
    </>
  );
};

export default ProductsPage;
