import { MenuItem as MenuItemType, Restaurant } from "@/lib/types";
import ConfirmModal from "./ConfirmModal";
import MenuItemCard from "./MenuItemCard";

interface MenuItemProps {
  menuItem: MenuItemType;
  restaurant: Restaurant;
}

function MenuItem({
  menuItem,
  restaurant,
}: MenuItemProps) {
  return (
    <ConfirmModal
      menuItem={menuItem}
      restaurant={restaurant}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        className="flex w-full group"
        type="button"
        data-testid={`menu-item-${menuItem.id}`}
      >
        <MenuItemCard menuItem={menuItem} />
      </button>
    </ConfirmModal>
  );
}

export default MenuItem;
