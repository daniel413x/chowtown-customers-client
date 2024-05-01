import { ReactNode, useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/common/shadcn/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/common/shadcn/select";
import { CartItem } from "@/lib/types";
import { Trash } from "lucide-react";
import useBasket from "@/lib/hooks/useBasket";
import RemoveModal from "./RemoveModal";
import MenuItemCard from "./MenuItemCard";
import { Button } from "../shadcn/button";
import QuantityModal from "./QuantityModal";

interface CartItemControlModalProps {
  children: ReactNode;
  cartItem: CartItem;
}

function CartItemControlModal({
  children,
  cartItem,
}: CartItemControlModalProps) {
  const {
    handleChangeQuantity,
    handleRemoveFromCart,
  } = useBasket();
  const ref = useRef<HTMLButtonElement>(null);
  const [showSelect, setShowSelect] = useState<boolean>(false);
  const [showOtherQuantityModal, setShowOtherQuantityModal] = useState<boolean>(false);
  const handleShowOtherQuantityModal = () => {
    setShowOtherQuantityModal(true);
    setShowSelect(false);
  };
  const [newQuantity, setNewQuantity] = useState<number>(cartItem.quantity);
  const handleSetOtherQuantity = (val: number) => {
    setNewQuantity(val);
  };
  const handleClickDone = () => {
    if (cartItem.quantity !== newQuantity) {
      handleChangeQuantity(newQuantity, cartItem.id);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <MenuItemCard menuItem={cartItem} quantity={newQuantity} />
        </DialogHeader>
        <div className="flex flex-col">
          <span className="text-sm">
            Quantity
          </span>
          <QuantityModal
            cartItem={cartItem}
            handleSetOtherQuantity={handleSetOtherQuantity}
            open={showOtherQuantityModal}
            close={() => setShowOtherQuantityModal(false)}
          />
          <Select
            value={String(newQuantity)}
            onValueChange={(val) => {
              // leverage SelectItem "value" prop to pass in "other" to conditionally render OtherQuantityModal
              if (val === "other") {
                handleShowOtherQuantityModal();
              } else {
                setNewQuantity(Number(val));
              }
            }}
            open={showSelect}
            onOpenChange={() => setShowSelect(!showSelect)}
          >
            <SelectTrigger className="w-[90px]">
              <SelectValue defaultValue={String(newQuantity)} />
            </SelectTrigger>
            <SelectContent>
              {/* provide choices 1-5 */}
              {Array.from({ length: 5 }, (_, i) => <SelectItem key={i} value={String(i + 1)}>{i + 1}</SelectItem>)}
              {/* without the following SelectItem the current input value will not show for values gt 5 */}
              {/* render conditionally to prevent issue where the value shows up twice in values 1-5 */}
              {newQuantity >= 6 ? (
                <SelectItem tabIndex={-1} value={String(newQuantity)}>
                  {newQuantity}
                </SelectItem>
              ) : null}
              <SelectItem value="other">
                Other
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter className="grid grid-cols-2 gap-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              ref={ref}
              onClick={handleClickDone}
              data-testid="modal-confirm-button"
            >
              Done
            </Button>
          </DialogClose>
          <RemoveModal
            cartItem={cartItem}
            onConfirm={() => {
              ref.current?.click();
              setTimeout(() => handleRemoveFromCart(cartItem), 300);
            }}
          >
            <Button
              variant="outline"
              data-testid="modal-remove-button"
            >
              <Trash className="mr-1" size={18} />
              Remove
            </Button>
          </RemoveModal>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CartItemControlModal;
