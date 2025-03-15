import { deleteEntrie } from "@/app/_actions/entrie/delete-entrie";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/app/_components/ui/alert-dialog";
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

     const handleContinueClick = async () => {
        try {
          await deleteEntrie(entrie);
          toast.success("Entrada excluída com sucesso.");
        } catch (error) {
          console.error(error);
          toast.error("Ocorreu um erro ao excluir a entrada.");
        }
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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Deseja realmente excluir esta entrada?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação é irreversível.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinueClick}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EntriesTableDropdownMenu;
