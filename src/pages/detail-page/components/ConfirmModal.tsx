import { MouseEvent, ReactNode, useState } from "react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/common/shadcn/alert-dialog";
import { ArrowRight, ShoppingBasket, Undo } from "lucide-react";
import { MenuItem, Restaurant } from "@/lib/types";
import useBasket from "@/lib/hooks/useBasket";
import { Button } from "@/components/ui/common/shadcn/button";
import MenuItemCard from "./MenuItemCard";

interface ConfirmModalProps {
  menuItem: MenuItem;
  restaurant: Restaurant;
  children: ReactNode;
}

function ConfirmModal({
  menuItem,
  restaurant,
  children,
}: ConfirmModalProps) {
  const [doubleConfirm, setDoubleConfirm] = useState<boolean>(false);
  const {
    restaurant: restaurantInBasket,
    cartItems,
    handleAddCartItem,
  } = useBasket();
  // restaurant name in basket does not match fetched restaurant name
  // user is trying to add items from different restaurants
  const mustClearBasket = cartItems.length > 0 && restaurant.restaurantName !== restaurantInBasket?.restaurantName;
  const handleConfirm = (e: MouseEvent) => {
    e.stopPropagation();
    handleAddCartItem(menuItem, restaurant);
    setDoubleConfirm(false);
  };
  const handleClose = (e: MouseEvent) => {
    e.stopPropagation();
    setDoubleConfirm(false);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger
        onClick={(e) => e.stopPropagation()}
        asChild
      >
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent data-testid="confirm-modal">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Add to your cart
          </AlertDialogTitle>
          <AlertDialogDescription>
            {doubleConfirm ? (
              <>
                It seems you already have items from
                {" "}
                <span className="italic">{restaurantInBasket?.restaurantName}</span>
                {" "}
                in your basket.
                <br />
                <br />
                In order to add
                {" "}
                <span className="italic">{menuItem.name}</span>
                {" "}
                to your basket, items from
                {" "}
                <span className="italic">{restaurantInBasket?.restaurantName}</span>
                {" "}
                must be removed.
                <span className="flex justify-center mt-3">
                  <ShoppingBasket className=" bg-orange-300 p-2.5" size={48} />
                  <ArrowRight className=" bg-orange-300/50 p-3" size={48} />
                  <ShoppingBasket className="bg-orange-300/20 p-2.5" size={48} />
                </span>
              </>
            ) : (
              "You are adding the following item to your cart:"
            )}
          </AlertDialogDescription>
          {!doubleConfirm ? (
            <MenuItemCard menuItem={menuItem} />
          ) : null}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* if user attempts to add items from two
          different restaurants, render a button to switch
          the modal content notifying that clearing the basket
          is necessary */}
          {mustClearBasket && !doubleConfirm ? (
            <Button
              onClick={() => setDoubleConfirm(true)}
              data-testid="modal-confirm-button"
              variant="secondary"
              className="bg-white"
            >
              <ShoppingBasket className="mr-1" size={20} />
              Add
            </Button>
          ) : null}
          {/* render button to add the item */}
          {(mustClearBasket && doubleConfirm) || !mustClearBasket ? (
            <AlertDialogAction
              onClick={handleConfirm}
              data-testid="modal-confirm-button"
            >
              <ShoppingBasket className="mr-1" size={20} />
              {doubleConfirm ? "Empty basket and add item" : "Add"}
            </AlertDialogAction>
          ) : null}
          <AlertDialogCancel
            onClick={handleClose}
            data-testid="modal-cancel-button"
          >
            <Undo className="mr-1" size={20} />
            Return
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmModal;
