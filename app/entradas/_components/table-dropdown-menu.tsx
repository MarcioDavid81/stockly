import { AlertDialog, AlertDialogTrigger } from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
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
  EditIcon,
  MoreHorizontalIcon,
  Trash2Icon,
} from "lucide-react";
import { toast } from "sonner";
import DeleteEntrieDialogContent from "./delete-dialog-content";

interface EntriesTableDropdownMenuProps {
  entrie: Pick<Product, "id">;
}

const EntriesTableDropdownMenu = ({
  entrie
}: EntriesTableDropdownMenuProps) => {
  //Função para copiar o ID do produto para a área de transferência
  const handleCopyProductId = () => {
    navigator.clipboard.writeText(entrie.id);
    toast.success("ID copiado para a área de transferência!");
  };


  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontalIcon size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Ações em Entradas</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-1.5" onClick={handleCopyProductId}>
            <ClipboardCopyIcon size={16} />
            Copiar ID
          </DropdownMenuItem>

            <DropdownMenuItem className="gap-1.5">
              <EditIcon size={16} />
              Editar Entrada
            </DropdownMenuItem>

          <AlertDialogTrigger>
            <DropdownMenuItem className="gap-1.5">
              <Trash2Icon size={16} />
              Excluir Entrada
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteEntrieDialogContent entrieId={entrie.id} />
    </AlertDialog>
  );
};

export default EntriesTableDropdownMenu;
