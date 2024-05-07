import { Order as OrderType } from "@/lib/types";
import { useGetRestaurantById } from "@/lib/api/RestaurantApi";
import { AspectRatio } from "@/components/ui/common/shadcn/aspect-ratio";
import OrderStatusHeader from "./OrderStatusHeader";
import OrderStatusDetail from "./OrderStatusDetail";

interface OrderProps {
  order: OrderType;
}

function Order({
  order,
}: OrderProps) {
  const { restaurant } = useGetRestaurantById(order.restaurantId);
  return (
    <div className="space-y-10  border-2 border-orange-500 font-semibold text-orange-500 p-10 rounded-lg">
      <OrderStatusHeader order={order} restaurant={restaurant} />
      <div className="grid gap-10 md:grid-cols-2">
        <OrderStatusDetail
          restaurant={restaurant}
          order={order}
        />
        {!restaurant ? null : (
          <AspectRatio ratio={16 / 5}>
            <img
              src={restaurant?.imageUrl}
              alt={`${restaurant.restaurantName} logo`}
              className="rounded-md object-cover h-full w-full"
            />
          </AspectRatio>
        )}
      </div>
    </div>
  );
}

export default Order;
