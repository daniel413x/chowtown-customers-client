import { Progress } from "@/components/ui/common/shadcn/progress";
import { Order, Restaurant, Status } from "@/lib/types";
import { format } from "date-fns";
import { Loader } from "lucide-react";

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
  const resolvedOrderStatus = orderStatus.find((orderStatusItem) => orderStatusItem.value === order.status);
  return (
    <>
      <div className="tracking-tighter flex flex-col gap-5 font-bold md:flex-row md:justify-between">
        <div className="flex flex-col">
          <h2 className="text-4xl font-bold">
            Order Status:
            {" "}
            {resolvedOrderStatus?.label}
          </h2>
          <span className="relative top-1.5">
            Order
            {" "}
            {order.id}
          </span>
        </div>
        <div className="flex flex-col justify-center text-left md:text-right">
          <span className="md:w-max">
            Order placed
            {" "}
            {orderPlaced}
          </span>
          <span className="flex md:justify-end">
            Expected by
            {" "}
            {!restaurant ? (
              <Loader className="ml-1 h-6 w-6 animate-spin" />
            ) : getExpectedDelivery()}
          </span>
        </div>
      </div>
      <Progress className="animate-pulse" value={resolvedOrderStatus?.progressValue} />
    </>
  );
}

export default OrderStatusHeader;
