import { AlertDialog, AlertDialogTrigger } from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { ClipboardCopyIcon, EditIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import UpsertProductDialogContent from "./upsert-dialog-content";
import DeleteProductDialogContent from "./delete-dialog-content";
import { useState } from "react";
import { toast } from "sonner";
import { Product } from "@prisma/client";

interface ProductTableDropdownMenuProps {
    product: Product
}

const ProductTableDropdownMenu  = ({product}: ProductTableDropdownMenuProps) => {
        //State para abrir e fechar o dialog
        const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
  
        //Função para copiar o ID do produto para a área de transferência
        const handleCopyProductId = () => {
          navigator.clipboard.writeText(product.id);
          toast.success(
            "ID do produto copiado com sucesso para a área de transferência!",
          );
        };
  
        return (
          <AlertDialog>
            <Dialog open={editDialogIsOpen} onOpenChange={setEditDialogIsOpen}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontalIcon size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Ações em Produtos</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="gap-1.5"
                    onClick={handleCopyProductId}
                  >
                    <ClipboardCopyIcon size={16} />
                    Copiar ID
                  </DropdownMenuItem>
  
                  <DialogTrigger asChild>
                    <DropdownMenuItem className="gap-1.5">
                      <EditIcon size={16} />
                      Editar Produto
                    </DropdownMenuItem>
                  </DialogTrigger>
  
                  <AlertDialogTrigger>
                    <DropdownMenuItem className="gap-1.5">
                      <Trash2Icon size={16} />
                      Excluir Produto
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
              <UpsertProductDialogContent defaultValues={{
                id: product.id,
                name: product.name,
                price: Number(product.price),
                stock: product.stock,
              }}
                onSuccess={() => setEditDialogIsOpen(false)}
              />
              <DeleteProductDialogContent productId={product.id} />
            </Dialog>
          </AlertDialog>
        );
}
 
export default ProductTableDropdownMenu;