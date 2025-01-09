import { Metadata } from "next";
import Sidebar from "../_components/sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Veja um resumo das suas finanças.",
};

const Home = async () => {

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
            <h2 className="text-xl font-semibold">Dashboard</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
