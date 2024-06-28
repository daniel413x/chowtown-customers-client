import { Skeleton } from "@/components/ui/common/shadcn/skeleton";
import { DETAIL_ROUTE } from "@/lib/consts";
import { Restaurant } from "@/lib/types";
import {
  Banknote, Clock, Dot, MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/common/shadcn/aspect-ratio";
import Price from "@/components/ui/common/Price";
import { haversineDistance } from "@/lib/utils";

interface SearchResultCardProps {
  restaurant: Restaurant;
  userLocation: [number, number] | null;
}

function SearchResultCard({
  restaurant,
  userLocation,
}: SearchResultCardProps) {
  return (
    <Link
      to={`/${DETAIL_ROUTE}/${restaurant.slug}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          alt={`${restaurant.restaurantName}'s logo`}
          className="rounded-md w-full h-full object-cover"
        />
      </AspectRatio>
      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {restaurant.restaurantName}
        </h3>
        <div
          className="grid md:grid-cols-2 gap-2"
        >
          <ul className="flex flex-row h-max flex-wrap">
            {restaurant.cuisines.map((cuisine, index) => (
              <li key={cuisine}>
                <span className="flex">
                  <span className="text-black/75">
                    {cuisine}
                  </span>
                  <span className="text-black/20">
                    {index < restaurant.cuisines.length - 1 ? <Dot /> : null}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 flex-col text-black/75">
            {!userLocation ? null : (
              <div className="flex items-center gap-1 ">
                <MapPin />
                <span data-testid="distance">
                  {haversineDistance(userLocation, restaurant.location)}
                </span>
                {" "}
                mi.
              </div>
            )}
            <div className="flex items-center gap-1 ">
              <Clock />
              {restaurant.estimatedDeliveryTime}
              {" "}
              mins
            </div>
            <div className="flex items-center gap-1 ">
              <Banknote />
              Delivery from
              <Price
                price={restaurant.deliveryPrice}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function SearchResultCardSkeleton() {
  return (
    <div
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
    >
      <AspectRatio ratio={16 / 6}>
        <Skeleton className="h-full" />
      </AspectRatio>
      <div>
        <Skeleton className="h-10 w-[300px] mb-2" />
        <div
          className="grid md:grid-cols-2 gap-2"
        >
          <div className="flex gap-2">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
          </div>
          <div className="flex gap-2 flex-col">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-[150px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResultCard;
