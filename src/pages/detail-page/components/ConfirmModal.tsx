import { MouseEvent, ReactNode } from "react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/common/shadcn/alert-dialog";
import { ShoppingBasket, Undo } from "lucide-react";
import { MenuItem } from "@/lib/types";
import MenuItemCard from "./MenuItemCard";

interface ConfirmModalProps {
  children: ReactNode;
  onConfirm: () => void;
  menuItem: MenuItem;
}

function ConfirmModal({
  children,
  onConfirm,
  menuItem,
}: ConfirmModalProps) {
  const handleConfirm = (e: MouseEvent) => {
    e.stopPropagation();
    onConfirm();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger
        onClick={(e) => e.stopPropagation()}
        asChild
      >
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Add to your cart
          </AlertDialogTitle>
          <AlertDialogDescription>
            You are adding the following item to your cart:
          </AlertDialogDescription>
          <MenuItemCard menuItem={menuItem} />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleConfirm} data-testid="modal-confirm-button">
            <ShoppingBasket className="mr-1" size={20} />
            Add
          </AlertDialogAction>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()} data-testid="modal-cancel-button">
            <Undo className="mr-1" size={20} />
            Return
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmModal;
