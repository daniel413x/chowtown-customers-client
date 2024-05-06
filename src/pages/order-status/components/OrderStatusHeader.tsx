import { Order, Restaurant } from "@/lib/types";

interface OrderStatusHeaderProps {
  order: Order;
  restaurant?: Restaurant;
}

function OrderStatusHeader({
  order,
  restaurant,
}: OrderStatusHeaderProps) {
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);
    created.setMinutes(
      created.getMinutes() + restaurant!.estimatedDeliveryTime,
    );
    const hours = created.getHours();
    const minutes = created.getMinutes();
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${paddedMinutes}`;
  };
  if (!restaurant) {
    return "Loading restaurant";
  }
  return (
    <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
      <span>
        Order Status:
        {" "}
        {order.status}
      </span>
      <span>
        Expected by:
        {" "}
        {getExpectedDelivery()}
      </span>
    </h1>
  );
}

export default OrderStatusHeader;
