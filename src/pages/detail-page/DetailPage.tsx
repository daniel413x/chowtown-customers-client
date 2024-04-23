import { useParams } from "react-router-dom";
import { useGetRestaurant } from "@/lib/api/RestaurantApi";
import { AspectRatio } from "@/components/ui/common/shadcn/aspect-ratio";
import { useState } from "react";
import { CartItem, MenuItem as MenuItemType } from "@/lib/types";
import RestaurantInfo from "./components/RestaurantInfo";
import MenuItem from "./components/MenuItem";
import OrderSummary from "./components/OrderSummary";

function DetailPage() {
  const {
    restaurantName,
  } = useParams();
  const {
    restaurant,
    isLoading,
  } = useGetRestaurant(restaurantName);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const handleAddCartItem = (selectedMenuItem: MenuItemType) => {
    setCartItems((prev) => {
      const nextCartItems: CartItem[] = [...prev];
      // 1. check if the item is already in the cart
      // 2. if item is in the cart, only update the quantity
      // 3. if item is not in the cart, add it as a new item
      const i = prev.findIndex((cartItem) => cartItem.id === selectedMenuItem.id);
      if (i >= 0) {
        nextCartItems[i] = {
          ...nextCartItems[i],
          quantity: nextCartItems[i].quantity + 1,
        };
      } else {
        nextCartItems.push({
          ...selectedMenuItem,
          quantity: 1,
        });
      }
      return nextCartItems;
    });
  };
  const handleRemoveFromCart = (selectedMenuItem: MenuItemType) => {
    setCartItems((prev) => {
      const nextCartItems = prev.filter((cartItem) => cartItem.id !== selectedMenuItem.id);
      return nextCartItems;
    });
  };
  if (isLoading || !restaurant) {
    return "Loading";
  }
  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          alt={`Logo for ${restaurant.restaurantName}`}
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-5">
        <div className="flex flex-col gap-4">
          <RestaurantInfo
            restaurant={restaurant}
          />
          <span className="text-2xl font-bold tracking-tight">
            Menu
          </span>
          <ul>
            {restaurant.menuItems.map((menuItem) => (
              <MenuItem
                key={menuItem.name}
                menuItem={menuItem}
                handleAddCartItem={handleAddCartItem}
              />
            ))}
          </ul>
        </div>
        <div className="right-col">
          <OrderSummary
            restaurant={restaurant}
            cartItems={cartItems}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
