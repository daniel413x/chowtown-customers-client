import { MouseEvent, ReactNode } from "react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/common/shadcn/alert-dialog";
import {
  Trash, Undo,
} from "lucide-react";
import { CartItem } from "@/lib/types";
import MenuItemCard from "./MenuItemCard";

interface RemoveModalProps {
  children: ReactNode;
  onConfirm: () => void;
  cartItem: CartItem;
}

function RemoveModal({
  children,
  onConfirm,
  cartItem,
}: RemoveModalProps) {
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
            Remove from your cart
          </AlertDialogTitle>
          <AlertDialogDescription>
            You are removing the following item to your cart:
          </AlertDialogDescription>
          <MenuItemCard menuItem={cartItem} />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleConfirm}>
            <Trash className="mr-1" size={18} />
            Remove
          </AlertDialogAction>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            <Undo className="mr-1" size={20} />
            Return
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default RemoveModal;
