import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/common/shadcn/dialog";
import { CartItem } from "@/lib/types";
import { Button } from "../shadcn/button";
import { Input } from "../shadcn/input";

interface QuantityModalProps {
  cartItem: CartItem;
  open: boolean;
  handleSetOtherQuantity: (val: number) => void;
  close: () => void;
}

function QuantityModal({
  cartItem,
  open,
  handleSetOtherQuantity,
  close,
}: QuantityModalProps) {
  const [newQuantity, setNewQuantity] = useState<number>(cartItem.quantity);
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="w-[250px]" data-testid="quantity-modal">
        <div className="flex flex-col">
          <span className="text-sm">
            Quantity
          </span>
          <Input
            data-testid="quantity-input"
            type="number"
            min={1}
            value={newQuantity}
            onChange={(e) => setNewQuantity(Number(e.target.value))}
          />
        </div>
        <DialogFooter className="grid grid-cols-2 gap-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={() => handleSetOtherQuantity(newQuantity)}
              data-testid="modal-confirm-button"
            >
              Done
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default QuantityModal;
