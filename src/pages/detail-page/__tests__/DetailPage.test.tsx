import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as RestaurantApiHooks from "@/lib/api/RestaurantApi";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { intToPrice, priceToInt } from "@/lib/utils";
import useBasket from "@/lib/hooks/useBasket";
import { act } from "react-dom/test-utils";
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

const testRestaurant = {
  restaurantName: "",
  slug: "",
  id: "",
  userId: "",
  imageUrl: "",
  city: "",
  country: "",
  deliveryPrice: 500,
  estimatedDeliveryTime: 0,
  cuisines: [],
  menuItems,
  lastUpdated: "",
  isActivatedByUser: true,
};

jest.mocked(RestaurantApiHooks.useGetRestaurant).mockReturnValue({
  restaurant: testRestaurant,
  isLoading: false,
} as any);

async function itemIsInCart(id: string) {
  await waitFor(() => {
    const cartItem = screen.getByTestId(`cart-item-${id}`);
    expect(cartItem).toBeInTheDocument();
  });
}

async function addItem(i: number) {
  const {
    id,
  } = menuItems[i];
  const menuItem = screen.getByTestId(`menu-item-${id}`);
  await userEvent.click(menuItem);
  const confirmAddButton = screen.getByTestId("modal-confirm-button");
  await userEvent.click(confirmAddButton);
  await itemIsInCart(id);
  return menuItems[i];
}

describe("DetailPage", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    act(() => useBasket.getState().reset());
  });

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
    render(<MemoryRouter><DetailPage /></MemoryRouter>);
    async function addItemAndCount(i: number) {
    // get the total or start with the delivery price as the base
      const prevTotal = priceToInt(Number(screen.getByTestId("total").textContent!) || intToPrice(testRestaurant.deliveryPrice));
      const { price } = await addItem(i);
      const currentTotal = priceToInt(Number(screen.getByTestId("total").textContent!));
      expect(currentTotal).toBe(prevTotal + price);
    }
    await addItemAndCount(0);
    await addItemAndCount(1);
    await addItemAndCount(2);
  });

  test("persists user cart items through session storage", async () => {
    const { unmount } = render(<MemoryRouter><DetailPage /></MemoryRouter>);
    const { name } = await addItem(2);
    unmount();
    render(<MemoryRouter><DetailPage /></MemoryRouter>);
    const cartItems = screen.getByTestId("cart-items-list");
    expect(cartItems).toHaveTextContent(name);
  });

  test("does not tell the user their cart will be reset if adding from one restaurant", async () => {
    render(<MemoryRouter><DetailPage /></MemoryRouter>);
    const menuItemOneButton = screen.getByTestId("menu-item-1");
    await userEvent.click(menuItemOneButton);
    let confirmAddButton = screen.getByTestId("modal-confirm-button");
    await userEvent.click(confirmAddButton);
    const menuItemTwoButton = screen.getByTestId("menu-item-2");
    await userEvent.click(menuItemTwoButton);
    confirmAddButton = screen.getByTestId("modal-confirm-button");
    await userEvent.click(confirmAddButton);
    expect(screen).not.toContain("Empty basket and add item");
  });

  test("tells the user their cart will be reset if adding items from two different restaurants", async () => {
    render(<MemoryRouter><DetailPage /></MemoryRouter>);
    // simulate pre-adding an item from a diffferent restaurant
    act(() => useBasket.getState().handleAddCartItem(menuItems[0], { ...testRestaurant, restaurantName: "different restaurant" }));
    const menuItemOneButton = screen.getByTestId("menu-item-1");
    await userEvent.click(menuItemOneButton);
    const confirmModal = screen.getByTestId("confirm-modal");
    const confirmAddButton = screen.getByTestId("modal-confirm-button");
    await userEvent.click(confirmAddButton);
    expect(confirmModal).toHaveTextContent("Empty basket and add item");
  });

  test("shows the delivery price of the restaurant from which the user's current cart items were added", async () => {
    // delivery price on rendered page should be that of restaurantInBasket.deliveryPrice
    const restaurantInBasket = {
      ...testRestaurant,
      deliveryPrice: 1200,
    };
    act(() => useBasket.getState().handleAddCartItem(menuItems[0], restaurantInBasket));
    render(<MemoryRouter><DetailPage /></MemoryRouter>);
    const ddprice = screen.getByTestId("delivery-price");
    expect(ddprice.textContent).toContain(intToPrice(restaurantInBasket.deliveryPrice));
  });
});
