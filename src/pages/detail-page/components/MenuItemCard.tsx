import {
  Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/common/shadcn/card";
import { MenuItem as MenuItemType } from "@/lib/types";
import { intToPrice } from "@/lib/utils";

interface MenuItemCardProps {
  menuItem: MenuItemType;
}

function MenuItemCard({
  menuItem,
}: MenuItemCardProps) {
  return (
    <Card className="w-full group-hover:bg-orange-400/80 group-hover:text-white ">
      <CardHeader>
        <CardTitle className="flex justify-center">
          {menuItem.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <span>
          $
        </span>
        <span className="text-xl">
          {intToPrice(menuItem.price)}
        </span>
      </CardContent>
    </Card>
  );
}

export default MenuItemCard;
