"use client";

import { Button } from "@/app/_components/ui/button";
import { PlusIcon } from "lucide-react";

const ExitsProductButton = () => {
  const handleExitProduct = () => {
    alert("Para de clicar guampa seca!");
  };

  return (
    <Button className="gap-2" onClick={handleExitProduct} variant="default">
      <PlusIcon size={20} />
        Saída de Produto
    </Button>
  );
};

export default ExitsProductButton;