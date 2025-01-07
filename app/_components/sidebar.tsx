import { LayoutGridIcon, LogOut, Minimize2Icon, PackageIcon, TruckIcon } from "lucide-react";
import SidebarButton from "./sidebar-button";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white justify-between flex flex-col h-screen">
      <div>
        {/* IMAGEM */}
        <div className="px-2 py-4">
          <Link href="/">
            <Image src="/logosf.png" alt="Stockly" width={200} height={100} />
          </Link>
        </div>
        {/* BOTÕES */}
        <div className="flex flex-col gap-2 p-2">
          <SidebarButton href="/">
            <LayoutGridIcon size={20} />
            Dashboard
          </SidebarButton>
          <SidebarButton href="/products">
            <PackageIcon size={20} />
            Produtos
          </SidebarButton>
          <SidebarButton href="/entradas">
            <TruckIcon size={20} />
            Entradas
          </SidebarButton>
          <SidebarButton href="/saidas">
            <Minimize2Icon size={20} />
            Saídas
          </SidebarButton>
        </div>
      </div>
      <div className="px-2 py-4">
        <h3>Usuário Logado</h3>
        <h3 className="text-green-500 flex items-center gap-2 mt-4">
          <LogOut size={20} />
          Logout
        </h3>
      </div>
    </div>
  );
};

export default Sidebar;
