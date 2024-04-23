import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/common/shadcn/card";
import { Restaurant } from "@/lib/types";
import { Dot } from "lucide-react";

interface RestaurantInfoProps {
  restaurant: Restaurant;
}

function RestaurantInfo({
  restaurant,
}: RestaurantInfoProps) {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription>
          {restaurant.city}
          &nbsp;
          |
          &nbsp;
          {restaurant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {restaurant.cuisines.map((c, i) => (
          <span className="flex" key={i}>
            {c}
            {i < restaurant.cuisines.length - 1 ? <Dot /> : null}
          </span>
        ))}
      </CardContent>
    </Card>
  );
}

export default RestaurantInfo;
