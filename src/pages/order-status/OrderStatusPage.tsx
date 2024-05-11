import { useGetUserOrders } from "@/lib/api/OrderApi";
import PageControl, { PageControlSkeleton } from "@/components/ui/common/PageControl";
import { useSearchParams } from "react-router-dom";
import { Loader } from "lucide-react";
import Searchbar from "@/components/ui/common/Searchbar";
import Meta from "@/components/misc/Meta";
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
    return (
      <Meta
        title="Your Orders"
      >
        <main className="md:px-32 py-8 flex flex-col gap-5">
          <h1 className="px-5 text-3xl font-bold tracking-tight text-orange-600">
            No orders found.
          </h1>
          <span className="px-5 text-lg text-orange-500">
            Let&apos;s fix that!
          </span>
          <Searchbar
            placeholder="Enter your city"
          />
        </main>
      </Meta>
    );
  }
  return (
    <Meta
      title={`(${orders?.pagination.count}) Your Orders`}
    >
      <main className="flex flex-col">
        <h1 className="text-3xl font-bold text-orange-500 mb-10">
          Your Orders
        </h1>
        <ul className="space-y-10 w-full max-w-[962px] self-center">
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
    </Meta>
  );
}

export default OrderStatusPage;
