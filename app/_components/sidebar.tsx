import {
  LayoutGridIcon,
  Minimize2Icon,
  PackageIcon,
  TruckIcon,
} from "lucide-react";
import SidebarButton from "./sidebar-button";

import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

const Sidebar = () => {
  return (
    <div className="flex h-screen w-64 flex-col justify-between bg-white">
      <div>
        {/* IMAGEM */}
        <div className="px-2 py-4">

            <Image src="/logosf.png" alt="Stockly" width={200} height={100} />

        </div>
        {/* BOTÕES */}
        <div className="flex flex-col gap-2 p-2">
          <SidebarButton href="/dashboard">
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
      <div className="px-2 py-4 mb-10">
        <UserButton showName />
      </div>
    </div>
  );
};

export default Sidebar;
