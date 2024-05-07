import Price from "@/components/ui/common/Price";
import { Separator } from "@/components/ui/common/shadcn/separator";
import { Order, Restaurant } from "@/lib/types";

interface OrderStatusDetailProps {
  order: Order;
  restaurant?: Restaurant;
}

function OrderStatusDetail({
  order,
  restaurant,
}: OrderStatusDetailProps) {
  if (!restaurant) {
    return "Loading restaurant";
  }
  if (!order.deliveryDetails) {
    return "no delivery details";
  }
  return (
    <div className="space-y-5">
      <div className="flex flex-col">
        <span className="font-bold">
          Delivery to:
        </span>
        <span>
          {order.deliveryDetails.name}
        </span>
        <span>
          {order.deliveryDetails.addressLineOne}
          ,
          {" "}
          {order.deliveryDetails.city}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">
          Your Order:
        </span>
        <ul>
          {order.cartItems.map((item) => (
            <li key={item.id}>
              {item.name}
              &#x2715;
              {item.quantity}
              {" "}
            </li>
          ))}
        </ul>
        <Separator className="bg-black" />
        <div className="flex flex-col items-start">
          <span className="font-bold">
            Total w/ delivery
          </span>
          <span className="text-black">
            <Price price={order.totalAmount} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderStatusDetail;
