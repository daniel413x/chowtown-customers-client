import {
  AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/common/shadcn/alert-dialog";
import { useNavigate } from "react-router-dom";

function ExitModal() {
  const navigate = useNavigate();
  return (
    <AlertDialog open>
      <AlertDialogContent data-testid="exit-modal">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Cart status
          </AlertDialogTitle>
          <AlertDialogDescription>
            You have no cart items
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => navigate("/")}
            data-testid="modal-confirm-button"
            className="bg-orange-300"
          >
            Exit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ExitModal;
