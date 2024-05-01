import useBasket from "@/lib/hooks/useBasket";
import { getTotalCost } from "@/lib/utils";
import { useGetMyUser } from "@/lib/api/MyUserApi";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import ExitModal from "./components/ExitModal";
import UserProfileForm, { UserFormData, UserProfileFormSkeleton } from "../user-profile/components/UserProfileForm";
import LineItem from "./components/LineItem";
import RestaurantInfo from "./components/RestaurantInfo";

function CheckoutPage() {
  const {
    cartItems,
    restaurant,
  } = useBasket();
  const { user, isLoading: isGetUserLoading } = useGetMyUser();
  const onCheckout = (userFormData: UserFormData) => {
    console.log({ ...userFormData, restaurant, cartItems });
    // TODO: integration
  };
  const totalCost = getTotalCost();
  if (cartItems.length === 0 || !restaurant) {
    return <ExitModal />;
  }
  return (
    <main className="flex flex-col justify-center items-center ">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          alt={`Logo for ${restaurant.restaurantName}`}
        />
      </AspectRatio>
      <div className="flex w-full md:w-[unset] gap-14 p-6 flex-col">
        <h2 className="text-2xl font-bold">Your Order</h2>
        <ul className="flex flex-col gap-6">
          <li>
            <RestaurantInfo label="Restaurant" figure={restaurant.restaurantName} />
          </li>
          <li>
            <RestaurantInfo label="City" figure={restaurant.city} />
          </li>
          <li>
            <RestaurantInfo label="Estimated Delivery time" figure={`${restaurant.estimatedDeliveryTime} minutes`} />
          </li>
        </ul>
        <ul className="flex flex-col justify-center gap-2">
          {cartItems.map((cartItem) => (
            <li key={cartItem.id}>
              <LineItem
                label={cartItem.name}
                quantity={cartItem.quantity}
                price={cartItem.price}
              />
            </li>
          ))}
          <li>
            <LineItem
              label="Delivery price"
              price={restaurant.deliveryPrice}
            />
          </li>
          <li>
            <LineItem
              label="Total"
              price={totalCost}
              noIntToPrice
            />
          </li>
        </ul>
        {isGetUserLoading || !user ? <UserProfileFormSkeleton /> : (
          <UserProfileForm
            isLoading={isGetUserLoading}
            user={user}
            onSave={onCheckout}
            title="Delivery address"
            desc=""
            buttonText="Continue to payment"
          />
        )}
      </div>
    </main>
  );
}

export default CheckoutPage;
