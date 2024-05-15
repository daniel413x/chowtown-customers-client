import Price from "@/components/ui/common/Price";
import { Separator } from "@/components/ui/common/shadcn/separator";
import { Order } from "@/lib/types";

interface OrderStatusDetailProps {
  order: Order;
}

function OrderStatusDetail({
  order,
}: OrderStatusDetailProps) {
  if (!order.deliveryDetails) {
    return "no delivery details";
  }
  return (
    <div className="space-y-5 text-black">
      <div className="flex flex-col">
        <span>
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
        <span>
          Order Items:
        </span>
        <ul className="flex flex-col gap-2 mt-2 mb-4">
          {order.cartItems.map((item) => (
            <li key={item.id}>
              <div className="ps-2">
                &#8226;
                {item.name}
                &#x2715;
                {item.quantity}
              </div>
              {" "}
            </li>
          ))}
        </ul>
        <Separator className="bg-black" />
        <div className="flex flex-col items-start">
          <span>
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
