import { useGetUserOrders } from "@/lib/api/OrderApi";
import PageControl, { PageControlSkeleton } from "@/components/ui/common/PageControl";
import { useSearchParams } from "react-router-dom";
import { Loader } from "lucide-react";
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
  if ((!isLoading && !orders) || orders?.rows.length === 0) {
    return <>No orders found</>;
  }
  return (
    <main className="flex flex-col items-center">
      <ul className="space-y-10 w-full max-w-[962px]">
        {isLoading ? (
          Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="flex items-center justify-center min-h-[453px] border-2 border-orange-500 text-orange-500">
              <Loader className="h-6 w-6 animate-spin" />
            </div>
          ))
        ) : null}
        {orders?.rows.map((order) => (
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
