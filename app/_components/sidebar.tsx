"use client";

import {
  LayoutGridIcon,
  Minimize2Icon,
  PackageIcon,
  TruckIcon,
} from "lucide-react";
import SidebarButton from "./sidebar-button";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import { Tooltip } from "./tooltip";
import { Separator } from "./ui/separator";

const ROUTES = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutGridIcon,
  },
  {
    name: "Produtos",
    href: "/products",
    icon: PackageIcon,
  },
  {
    name: "Entradas",
    href: "/entradas",
    icon: TruckIcon,
  },
  {
    name: "Saídas",
    href: "/saidas",
    icon: Minimize2Icon,
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`${isOpen ? "w-72" : "w-20"} relative hidden h-screen flex-col justify-between bg-white transition-all duration-300 md:flex`}
    >
      <Image
        src="/control.png"
        alt="Stockly"
        width={30}
        height={30}
        className={`absolute -right-3 top-10 cursor-pointer rounded-full border-2 ${isOpen ? "" : "rotate-180"}`}
        onClick={() => setIsOpen(!isOpen)}
      />
      <div>
        {/* LOGO */}
        <div className="flex items-center justify-center px-2 py-4 text-4xl font-extrabold">
          {isOpen ? (
            <Image src="/logosf.png" alt="Stockly" width={200} height={100} />
          ) : (
            <Image src="/tractor.png" alt="Tractor" width={45} height={45} />
          )}
        </div>
        <Separator />
        {/* BOTÕES */}
        <div
          className={`${isOpen ? "" : "items-center"} flex flex-col gap-2 p-2`}
        >
          {ROUTES.map((route, index) => (
            <Tooltip key={index} content={route.name}>
              <SidebarButton href={route.href}>
                <route.icon size={20} />
                <span className={`duration-300 ${!isOpen && "hidden"}`}>
                  {route.name}
                </span>
              </SidebarButton>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* USER */}
      <div className="mb-4 py-4 text-center">
        <Separator className="mb-4" />
        {isOpen ? <UserButton showName /> : <UserButton />}
      </div>
    </div>
  );
};

export default Sidebar;
