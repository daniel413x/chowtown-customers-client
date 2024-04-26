import { Badge } from "@/components/ui/common/shadcn/badge";
import {
  Card, CardContent, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/common/shadcn/card";
import { Separator } from "@/components/ui/common/shadcn/separator";
import { CartItem, Restaurant } from "@/lib/types";
import { intToPrice } from "@/lib/utils";
import { Trash } from "lucide-react";
import RemoveModal from "./RemoveModal";
import CheckoutButton from "./CheckoutButton";

function DotSeparator() {
  return <div className="border-0 border-dotted border-b-8 border-b-stone-200 flex-1 self-end" />;
}

interface OrderSummaryProps {
  restaurant: Restaurant;
  cartItems: CartItem[];
  handleRemoveFromCart: (cartItem: CartItem) => void;
}

function OrderSummary({
  restaurant,
  cartItems,
  handleRemoveFromCart,
}: OrderSummaryProps) {
  const noItems = cartItems.length === 0;
  const getTotalCost = () => {
    if (noItems) {
      return 0;
    }
    const totalCartItemsCost = cartItems.map(({ price, quantity }) => price * quantity).reduce((a, b) => a + b, 0);
    const totalWithDelivery = totalCartItemsCost + restaurant.deliveryPrice;
    return intToPrice(totalWithDelivery);
  };
  const totalCost = getTotalCost();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span
            data-testid="your-order-span"
            id="your-order-span"
          >
            Your Order
          </span>
          <DotSeparator />
          <span>
            $
            {totalCost}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2 pb-4">
        {noItems ? "Your order has no items" : (
          <ul data-testid="cart-items-list">
            {cartItems.map((cartItem) => (
              <li key={cartItem.id}>
                <div className="flex justify-between items-center" key={cartItem.id}>
                  <span>
                    <Badge variant="outline" className="mr-2">
                      {cartItem.quantity}
                    </Badge>
                    {cartItem.name}
                  </span>
                  <DotSeparator />
                  <span className="flex items-center gap-1">
                    <RemoveModal
                      onConfirm={() => handleRemoveFromCart(cartItem)}
                      cartItem={cartItem}
                    >
                      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                      <button
                        className="p-2"
                        type="button"
                        data-testid={`remove-cart-item-${cartItem.id}`}
                      >
                        <Trash color="red" size={20} />
                      </button>
                    </RemoveModal>
                    $
                    {intToPrice(cartItem.price * cartItem.quantity)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
        <Separator />
        <div className="flex justify-between">
          <span>
            Delivery
          </span>
          <DotSeparator />
          <span>
            $
            {noItems ? 0 : intToPrice(restaurant.deliveryPrice)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>
            Total
          </span>
          <DotSeparator />
          <span>
            $
            <span data-testid="total">
              {totalCost}
            </span>
          </span>
        </div>
        <Separator />
      </CardContent>
      <CardFooter className="justify-center">
        <CheckoutButton />
      </CardFooter>
    </Card>
  );
}

export default OrderSummary;
