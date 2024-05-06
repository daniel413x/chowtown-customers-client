import { Order as OrderType } from "@/lib/types";
import { useGetRestaurantById } from "@/lib/api/RestaurantApi";
import OrderStatusHeader from "./OrderStatusHeader";

interface OrderProps {
  order: OrderType;
}

function Order({
  order,
}: OrderProps) {
  const { restaurant } = useGetRestaurantById(order.restaurantId);
  return (
    <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
      <OrderStatusHeader order={order} restaurant={restaurant} />
    </div>
  );
}

export default Order;
