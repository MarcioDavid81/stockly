"use client";

import { Button } from "@/app/_components/ui/button";
import { PlusIcon } from "lucide-react";

const EntriesProductButton = () => {
  const handleEntrieProduct = () => {
    alert("Para de clicar guampa seca!");
  };

  return (
    <Button className="gap-2" onClick={handleEntrieProduct} variant="default">
      <PlusIcon size={20} />
        Entrada de Produto
    </Button>
  );
};

export default EntriesProductButton;