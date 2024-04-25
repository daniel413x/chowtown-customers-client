import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as RestaurantApiHooks from "@/lib/api/RestaurantApi";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { intToPrice, priceToInt } from "@/lib/utils";
import DetailPage from "../DetailPage";

jest.mock("@/lib/api/RestaurantApi", () => ({
  useGetRestaurant: jest.fn(),
}));

const menuItems = [
  {
    id: "1",
    name: "ItemOne",
    price: 1000,
  },
  {
    id: "2",
    name: "ItemTwo",
    price: 777,
  },
  {
    id: "3",
    name: "ItemThree",
    price: 1000,
  },
];

const restaurant = {
  restaurantName: "",
  slug: "",
  imageUrl: "",
  city: "",
  country: "",
  deliveryPrice: 500,
  estimatedDeliveryTime: "",
  cuisines: [],
  menuItems,
  lastUpdated: "",
  isActivatedByUser: "",
};

jest.mocked(RestaurantApiHooks.useGetRestaurant).mockReturnValue({
  restaurant,
  isLoading: false,
} as any);

async function addItem(i: number) {
  const {
    id,
    name,
  } = menuItems[i];
  const menuItem = screen.getByTestId(`menu-item-${id}`);
  await userEvent.click(menuItem);
  const confirmAddButton = screen.getByTestId("modal-confirm-button");
  await userEvent.click(confirmAddButton);
  await waitFor(() => {
    const cartItems = screen.getByTestId("cart-items-list");
    expect(cartItems.textContent).toContain(name);
  });
  return menuItems[i];
}

describe("DetailPage", () => {
  // test adding two items and then removing one
  test("can add and delete items from the cart", async () => {
    render(<MemoryRouter><DetailPage /></MemoryRouter>);
    const {
      id: removedId,
      name: removedName,
    } = await addItem(0);
    await addItem(1);
    const removeButton = screen.getByTestId(`remove-cart-item-${removedId}`);
    await userEvent.click(removeButton);
    const confirmRemoveButton = screen.getByTestId("modal-confirm-button");
    await userEvent.click(confirmRemoveButton);
    await waitFor(() => {
      const cartItems = screen.getByTestId("cart-items-list");
      expect(cartItems.textContent).not.toContain(removedName);
    });
  });

  test("can accurately track price changes in the total", async () => {
    async function addItemAndCount(i: number) {
      const prevTotal = priceToInt(Number(screen.getByTestId("total").textContent!) || intToPrice(restaurant.deliveryPrice));
      const { price } = await addItem(i);
      const currentTotal = priceToInt(Number(screen.getByTestId("total").textContent!));
      expect(currentTotal).toBe(prevTotal + price);
    }
    render(<MemoryRouter><DetailPage /></MemoryRouter>);
    await addItemAndCount(0);
    await addItemAndCount(1);
    await addItemAndCount(2);
  });
});
