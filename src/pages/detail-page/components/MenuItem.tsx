import {
  Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/common/shadcn/card";
import { MenuItem as MenuItemType } from "@/lib/types";
import { intToPrice } from "@/lib/utils";

interface MenuItemProps {
  menuItem: MenuItemType;
  handleAddCartItem: (selectedMenuItem: MenuItemType) => void;
}

function MenuItem({
  menuItem,
  handleAddCartItem,
}: MenuItemProps) {
  return (
    <button
      className="flex w-full group"
      type="button"
      onClick={() => handleAddCartItem(menuItem)}
    >
      <Card className="w-full group-hover:bg-orange-400 group-hover:text-white ">
        <CardHeader>
          <CardTitle>
            {menuItem.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span>
            $
          </span>
          <span className="text-xl">
            {intToPrice(menuItem.price)}
          </span>
        </CardContent>
      </Card>
    </button>
  );
}

export default MenuItem;
