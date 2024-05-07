import { useGetUserOrders } from "@/lib/api/OrderApi";
import PageControl, { PageControlSkeleton } from "@/components/ui/common/PageControl";
import { useSearchParams } from "react-router-dom";
import Order from "./components/Order";

function OrderStatusPage() {
  const [, setSearchParams] = useSearchParams();
  const { orders, isLoading } = useGetUserOrders();
  const handleSetPage = (num: number) => {
    window.scrollTo({
      top: 0,
    });
    setSearchParams({ page: String(num) });
  };
  if (isLoading) {
    return <>loading</>;
  }
  if (!orders || orders?.rows.length === 0) {
    return <>No orders found</>;
  }
  return (
    <main className="flex flex-col items-center">
      <ul className="space-y-10">
        {orders.rows.map((order) => (
          <li key={order.id}>
            <Order order={order} />
          </li>
        ))}
      </ul>
      {!orders ? null : (
        <PageControl
          page={orders?.pagination.page}
          pages={orders?.pagination.pages}
          pageLimitReached={orders?.pagination.pageLimitReached}
          handleSetPage={handleSetPage}
        />
      )}
      {isLoading ? <PageControlSkeleton /> : null}
    </main>
  );
}

export default OrderStatusPage;
