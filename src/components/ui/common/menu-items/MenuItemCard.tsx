import {
  Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/common/shadcn/card";
import { MenuItem as MenuItemType } from "@/lib/types";
import { intToPrice } from "@/lib/utils";

interface MenuItemCardProps {
  menuItem: MenuItemType;
  quantity?: number;
}

function MenuItemCard({
  menuItem,
  quantity = 1,
}: MenuItemCardProps) {
  return (
    <Card className="w-full group-hover:bg-orange-500 group-hover:text-white">
      <CardHeader>
        <CardTitle className="flex justify-center">
          {menuItem.name}
          {quantity > 1 ? ` × ${quantity}` : null}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center [font-family:Lato]">
        <span className="relative bottom-0.5">
          $
        </span>
        <span className="text-xl" data-testid="menu-item-card-price">
          {intToPrice(menuItem.price * Number(quantity))}
        </span>
      </CardContent>
    </Card>
  );
}

export default MenuItemCard;
