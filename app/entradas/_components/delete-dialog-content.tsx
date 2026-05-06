import { deleteEntrie } from "@/app/_actions/entrie/delete-entrie";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { toast } from "sonner";

interface DeleteEntrieDialogContentProps {
  entrieId: string;
}

const DeleteEntrieDialogContent = ({
  entrieId,
}: DeleteEntrieDialogContentProps) => {
  const handleContinueClick = async () => {
    try {
      await deleteEntrie({ id: entrieId });
      toast.success("Entrada excluído com sucesso.");
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao excluir o entrada.");
    }
  };

  return (
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
  );
};

export default DeleteEntrieDialogContent;
