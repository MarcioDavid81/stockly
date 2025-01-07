"use client";

import { Button } from "@/app/_components/ui/button";
import { PlusIcon } from "lucide-react";

const CreateProductButton = () => {
  const handleAddProduct = () => {
    alert("Para de clicar guampa seca!");
  };

  return (
    <Button className="gap-2" onClick={handleAddProduct} variant="default">
      <PlusIcon size={20} />
      Novo Produto
    </Button>
  );
};

export default CreateProductButton;
