import { Badge } from "@/components/ui/common/shadcn/badge";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/common/shadcn/card";
import { Separator } from "@/components/ui/common/shadcn/separator";
import { CartItem, Restaurant } from "@/lib/types";
import { getTotalCost, intToPrice } from "@/lib/utils";
import { Trash } from "lucide-react";
import useBasket from "@/lib/hooks/useBasket";
import { Link } from "react-router-dom";
import { DETAIL_ROUTE } from "@/lib/consts";
import RemoveModal from "./RemoveModal";
import CheckoutButton from "./CheckoutButton";

function DotSeparator() {
  return <div className="border-0 border-dotted border-b-8 border-b-stone-200 flex-1 self-end" />;
}

interface OrderSummaryProps {
  restaurantOnPage: Restaurant;
  cartItems: CartItem[];
}

function OrderSummary({
  restaurantOnPage,
  cartItems,
}: OrderSummaryProps) {
  const { restaurant: restaurantInBasket, handleRemoveFromCart } = useBasket();
  const noItems = cartItems.length === 0;
  const totalCost = getTotalCost();
  const addRestaurantLabel = restaurantInBasket?.restaurantName && restaurantInBasket?.restaurantName !== restaurantOnPage.restaurantName;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span
            data-testid="your-order-span"
            id="your-order-span"
          >
            Your Cart
          </span>
          <DotSeparator />
          <span>
            $
            {totalCost}
          </span>
        </CardTitle>
      </CardHeader>
      {addRestaurantLabel ? (
        <CardDescription className="text-center relative bottom-2">
          for
          {" "}
          <Link
            className="text-amber-600 underline"
            to={`/${DETAIL_ROUTE}/${restaurantInBasket!.slug}`}
          >
            {restaurantInBasket?.restaurantName}
          </Link>
        </CardDescription>
      ) : null}
      <CardContent className="flex flex-col space-y-2 pb-4">
        {noItems ? "Your cart has no items" : (
          <ul data-testid="cart-items-list">
            {cartItems.map((cartItem) => (
              <li key={cartItem.id}>
                <div className="flex justify-between items-center" key={cartItem.id} data-testid={`cart-item-${cartItem.id}`}>
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
          <span data-testid="delivery-price">
            $
            {noItems ? 0 : intToPrice(restaurantInBasket!.deliveryPrice)}
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
