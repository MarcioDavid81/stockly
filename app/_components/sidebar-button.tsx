"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

interface SidebarButtonProps {
    children: React.ReactNode;
    href: string;
    className?: string
}

const SidebarButton = ({href, children, className}: SidebarButtonProps) => {
  const pathName = usePathname();

  return (
    <Button
      variant={pathName === `${href}` ? "secondary" : "ghost"}
      className="justify-start gap-2"
      asChild
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </Button>
  );
};

export default SidebarButton;
