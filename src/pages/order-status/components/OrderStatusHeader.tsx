import { Progress } from "@/components/ui/common/shadcn/progress";
import { Order, Restaurant, Status } from "@/lib/types";
import { format } from "date-fns";

type OrderStatusInfo = {
    label: string;
    value: Status;
    progressValue: number;
}

export const orderStatus: OrderStatusInfo[] = [
  {
    label: "Placed",
    value: Status.PLACED,
    progressValue: 0,
  },
  {
    label: "Awaiting restaurant confirmation",
    value: Status.PAID,
    progressValue: 25,
  },
  {
    label: "In progress",
    value: Status.IN_PROGRESS,
    progressValue: 50,
  },
  {
    label: "Out for delivery",
    value: Status.OUT_FOR_DELIVERY,
    progressValue: 75,
  },
  {
    label: "Delivered",
    value: Status.DELIVERED,
    progressValue: 100,
  },
];

interface OrderStatusHeaderProps {
  order: Order;
  restaurant?: Restaurant;
}

function OrderStatusHeader({
  order,
  restaurant,
}: OrderStatusHeaderProps) {
  const orderPlaced = format(new Date(order.createdAt), "MMM d, yyyy 'at' h:mm a");
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);
    created.setMinutes(
      created.getMinutes() + restaurant!.estimatedDeliveryTime,
    );
    return format(created, "h:mm a");
  };
  const getOrderStatusInfo = () => orderStatus.find((orderStatusItem) => orderStatusItem.value === order.status);
  if (!restaurant) {
    return "Loading restaurant";
  }
  return (
    <>
      <div className="tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
        <div className="flex flex-col">
          <h2 className="text-4xl font-bold">
            Order Status:
            {" "}
            {order.status}
          </h2>
          <span>
            Order
            {" "}
            {order.id}
          </span>
        </div>
        <div className="flex flex-col justify-center text-right">
          <span>
            Order placed
            {" "}
            {orderPlaced}
          </span>
          <span>
            Expected by
            {" "}
            {getExpectedDelivery()}
          </span>
        </div>
      </div>
      <Progress className="animate-pulse" value={getOrderStatusInfo()?.progressValue} />
    </>
  );
}

export default OrderStatusHeader;
