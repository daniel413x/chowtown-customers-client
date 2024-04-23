import { Badge } from "@/components/ui/common/shadcn/badge";
import {
  Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/common/shadcn/card";
import { Separator } from "@/components/ui/common/shadcn/separator";
import { CartItem, Restaurant } from "@/lib/types";
import { intToPrice } from "@/lib/utils";
import { Trash } from "lucide-react";

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
          <span>
            Your Order
          </span>
          <DotSeparator />
          <span>
            $
            {totalCost}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        {noItems ? "Your order has no items" : (
          <ul>
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
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      className="p-2"
                      onClick={() => handleRemoveFromCart(cartItem)}
                      type="button"
                    >
                      <Trash color="red" size={20} />
                    </button>
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
            {totalCost}
          </span>
        </div>
        <Separator />
      </CardContent>
    </Card>
  );
}

export default OrderSummary;
