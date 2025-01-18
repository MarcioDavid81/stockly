import { deleteExit } from "@/app/_actions/exit/delete-exit";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Sale } from "@prisma/client";
import {
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  Trash2Icon,
} from "lucide-react";
import { toast } from "sonner";

interface ExitsTableDropdownMenuProps {
  exit: Pick<Sale, "id">;
}

const ExitsTableDropdownMenu = ({ exit }: ExitsTableDropdownMenuProps) => {
  //Função para copiar o ID do produto para a área de transferência
  const handleCopyProductId = () => {
    navigator.clipboard.writeText(exit.id);
    toast.success(
      "ID do produto copiado com sucesso para a área de transferência!",
    );
  };

    const handleContinueClick = async () => {
      try {
        await deleteExit(exit);
        toast.success("Saída excluída com sucesso.");
      } catch (error) {
        console.error(error);
        toast.error("Ocorreu um erro ao excluir a saída.");
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
          <DropdownMenuLabel>Ações em Saídas</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-1.5" onClick={handleCopyProductId}>
            <ClipboardCopyIcon size={16} />
            Copiar ID
          </DropdownMenuItem>

            <DropdownMenuItem className="gap-1.5">
              <EditIcon size={16} />
              Editar Saída
            </DropdownMenuItem>

          <AlertDialogTrigger>
            <DropdownMenuItem className="gap-1.5">
              <Trash2Icon size={16} />
              Excluir Saída
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Deseja realmente excluir esta saída?
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

export default ExitsTableDropdownMenu;
