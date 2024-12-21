import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import SidebarButton from "./sidebar-button";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white">
      {/* IMAGEM */}
      <div className="px-2 py-4">
        <Link href="/">
          <h1 className="text-4xl font-black">STOCKLY</h1>
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

        <SidebarButton href="/sales">
          <ShoppingBasketIcon size={20} />
          Pedidos
        </SidebarButton>        
      </div>
    </div>
  );
};

export default Sidebar;
