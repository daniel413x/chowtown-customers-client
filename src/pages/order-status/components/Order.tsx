import { Order as OrderType } from "@/lib/types";
import { useGetRestaurantById } from "@/lib/api/RestaurantApi";
import { AspectRatio } from "@/components/ui/common/shadcn/aspect-ratio";
import { Skeleton } from "@/components/ui/common/shadcn/skeleton";
import { Loader } from "lucide-react";
import OrderStatusHeader from "./OrderStatusHeader";
import OrderStatusDetail from "./OrderStatusDetail";

interface OrderProps {
  order: OrderType;
}

function Order({
  order,
}: OrderProps) {
  const { restaurant } = useGetRestaurantById(order.restaurantId);
  return (
    <div className="space-y-10 border-2 border-orange-500 font-semibold text-orange-500 p-10 rounded-lg">
      <OrderStatusHeader order={order} restaurant={restaurant} />
      <div className="grid gap-10 md:grid-cols-2">
        <OrderStatusDetail
          order={order}
        />
        <AspectRatio ratio={16 / 5} className="flex items-center justify-center">
          {!restaurant ? <Loader className="h-6 w-6 animate-spin" /> : (
            <img
              src={restaurant?.imageUrl}
              alt={`${restaurant.restaurantName} logo`}
              className="rounded-md object-cover h-full w-full"
            />
          )}
        </AspectRatio>
      </div>
    </div>
  );
}

export function PageControlSkeleton() {
  return (
    <div
      className="flex m-auto gap-2 mt-14"
    >
      <Skeleton className="h-10 w-[100px] mr-2" />
      <Skeleton className="h-10 w-10" />
      <Skeleton className="h-10 w-10" />
      <Skeleton className="h-10 w-16 ml-4" />
    </div>
  );
}

export default Order;
