import { auth } from "@clerk/nextjs/server";
import Sidebar from "../_components/sidebar";
import EntriesProductButton from "./_components/entries-product-button";
import { Metadata } from "next";
import { redirect } from "next/navigation";

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
          <EntriesProductButton />
        </div>
      </div>
    </>
  );
};

export default EntriesPage;
