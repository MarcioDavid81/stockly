import { AlertDialog } from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Dialog } from "@/app/_components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Product } from "@prisma/client";
import {
  ClipboardCopyIcon,
  MoreHorizontalIcon,
  Trash2Icon,
} from "lucide-react";
import { toast } from "sonner";

interface EntriesTableDropdownMenuProps {
  product: Pick<Product, "id">;
  onDelete: (productId: string) => void;
}

const UpsertEntrieTableDropdownMenu = ({
  product,
  onDelete,
}: EntriesTableDropdownMenuProps) => {
  //Função para copiar o ID do produto para a área de transferência
  const handleCopyProductId = () => {
    navigator.clipboard.writeText(product.id);
    toast.success("ID copiado para a área de transferência!");
  };

  return (
    <Dialog>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontalIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-1.5" onClick={handleCopyProductId}>
              <ClipboardCopyIcon size={16} />
              Copiar ID
            </DropdownMenuItem>

            <DropdownMenuItem
              className="gap-1.5"
              onClick={() => onDelete(product.id)}
            >
              <Trash2Icon size={16} />
              Excluir Produto
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </AlertDialog>
    </Dialog>
  );
};

export default UpsertEntrieTableDropdownMenu;
