import { useParams } from "react-router-dom";
import { useGetRestaurant } from "@/lib/api/RestaurantApi";
import { AspectRatio } from "@/components/ui/common/shadcn/aspect-ratio";
import RestaurantInfo from "./components/RestaurantInfo";
import MenuItem from "./components/MenuItem";
import OrderSummary from "./components/OrderSummary";
import useBasket from "../../lib/hooks/useBasket";

function DetailPage() {
  const {
    restaurantName,
  } = useParams();
  const {
    restaurant,
    isLoading,
  } = useGetRestaurant(restaurantName);
  const {
    cartItems,
  } = useBasket();
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
              <li key={menuItem.name}>
                <MenuItem
                  menuItem={menuItem}
                  restaurant={restaurant}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="right-col">
          <OrderSummary
            restaurantOnPage={restaurant}
            cartItems={cartItems}
          />
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
