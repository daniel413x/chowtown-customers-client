import { MenuItem as MenuItemType } from "@/lib/types";
import ConfirmModal from "./ConfirmModal";
import MenuItemCard from "./MenuItemCard";

interface MenuItemProps {
  menuItem: MenuItemType;
  handleAddCartItem: (selectedMenuItem: MenuItemType) => void;
}

function MenuItem({
  menuItem,
  handleAddCartItem,
}: MenuItemProps) {
  return (
    <ConfirmModal
      onConfirm={() => handleAddCartItem(menuItem)}
      menuItem={menuItem}
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
