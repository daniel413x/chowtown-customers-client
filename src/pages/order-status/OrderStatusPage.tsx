import { useGetUserOrders } from "@/lib/api/OrderApi";
import Order from "./components/Order";

function OrderStatusPage() {
  const { orders, isLoading } = useGetUserOrders();
  if (isLoading) {
    return <>loading</>;
  }
  if (!orders || orders?.rows.length === 0) {
    return <>No orders found</>;
  }
  return (
    <main className="space-y-10 ">
      <ul>
        {orders.rows.map((order) => (
          <li key={order.id}>
            <Order order={order} />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default OrderStatusPage;
