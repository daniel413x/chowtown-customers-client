import {
  render, screen, waitFor, within, act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import * as RestaurantApiHooks from "@/lib/api/RestaurantApi";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { intToPrice, priceToInt } from "@/lib/utils";
import useBasket from "@/lib/hooks/useBasket";
import assert from "assert";
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
  restaurantName: "test restaurant",
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

async function addItem(i: number) {
  const {
    id,
    name,
  } = menuItems[i];
  const menuItem = screen.getByTestId(`menu-item-${id}`);
  await userEvent.click(menuItem);
  const confirmAddButton = screen.getByTestId("modal-confirm-button");
  await userEvent.click(confirmAddButton);
  const cartItems = screen.getByTestId("cart-items-list");
  expect(cartItems).toHaveTextContent(name);
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
  test("can add to the cart", async () => {
    render(<MemoryRouter><DetailPage /></MemoryRouter>);
    await addItem(0);
    await addItem(1);
  });

  test("can accurately track price changes in the total", async () => {
    render(<MemoryRouter><DetailPage /></MemoryRouter>);
    async function addItemAndCount(i: number) {
    // get the total or start with the delivery price as the base
      const prevTotal = priceToInt(Number(screen.getByTestId("total-tsx-price").textContent!) || intToPrice(testRestaurant.deliveryPrice));
      const { price } = await addItem(i);
      const currentTotal = priceToInt(Number(screen.getByTestId("total-tsx-price").textContent!));
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

  test("tells the user their cart items are relevant to a different restaurant if their cart items are not from the same restaurant as that of the current page", async () => {
    render(<MemoryRouter><DetailPage /></MemoryRouter>);
    // simulate pre-adding an item from a diffferent restaurant
    act(() => useBasket.getState().handleAddCartItem(menuItems[0], { ...testRestaurant, restaurantName: "different restaurant" }));
    expect(screen.getByTestId("for-restaurant-link")).toBeInTheDocument();
  });

  test("tells the user their cart will be reset if adding items from two different restaurants", async () => {
    render(<MemoryRouter><DetailPage /></MemoryRouter>);
    // simulate pre-adding an item from a diffferent restaurant
    act(() => useBasket.getState().handleAddCartItem(menuItems[0], { ...testRestaurant, restaurantName: "different restaurant" }));
    const menuItemOneButton = screen.getByTestId("menu-item-1");
    await userEvent.click(menuItemOneButton);
    const confirmAddButton = screen.getByTestId("modal-confirm-button");
    await userEvent.click(confirmAddButton);
    waitFor(async () => {
      const confirmModal = screen.getByTestId("confirm-modal");
      expect(confirmModal).toHaveTextContent("Empty basket and add item");
    });
  });

  test("shows the delivery price of the restaurant from which the user's current cart items were added", async () => {
    // delivery price on rendered page should be that of restaurantInBasket.deliveryPrice
    const restaurantInBasket = {
      ...testRestaurant,
      deliveryPrice: 1200,
    };
    act(() => useBasket.getState().handleAddCartItem(menuItems[0], restaurantInBasket));
    render(<MemoryRouter><DetailPage /></MemoryRouter>);
    const ddprice = screen.getByTestId("delivery-tsx-price");
    expect(ddprice.textContent).toContain(intToPrice(restaurantInBasket.deliveryPrice));
  });

  describe("the user has a cart item added", () => {
    beforeEach(() => {
      render(<MemoryRouter><DetailPage /></MemoryRouter>);
      act(() => useBasket.getState().handleAddCartItem(menuItems[0], testRestaurant));
    });

    describe("the control modal is open", () => {
      beforeEach(async () => {
        const cartItem = screen.getByTestId("cart-item-1");
        await userEvent.click(cartItem);
      });

      describe("the quantity select is open", () => {
        let initialMenuItemCardPrice: number;
        beforeEach(async () => {
          window.HTMLElement.prototype.hasPointerCapture = jest.fn();
          window.HTMLElement.prototype.scrollIntoView = jest.fn();
          const quantitySelectButton = screen.getByTestId("quantity-select-button");
          await userEvent.click(quantitySelectButton);
          const modal = screen.getByTestId("cart-item-control-modal");
          initialMenuItemCardPrice = priceToInt(within(modal).getByTestId("menu-item-card-price").textContent!);
        });

        test("can change the quantity and update the item x quantity displayed in the modal", async () => {
          await Promise.all(Array(5).map(async (_, i) => {
            const quantityButton = screen.getByTestId(`quantity-${i + 1}-button`);
            await userEvent.click(quantityButton);
            const modal = screen.getByTestId("cart-item-control-modal");
            const menuItemCardPrice = priceToInt(within(modal).getByTestId("menu-item-card-price").textContent!);
            assert(menuItemCardPrice / i + 1 === initialMenuItemCardPrice);
          }));
        });

        test("opens the quantity modal on clicking \"other\"", async () => {
          const quantitySelectButton = screen.getByTestId("quantity-modal-button");
          await userEvent.click(quantitySelectButton);
          expect(screen.getByTestId("quantity-modal")).toBeInTheDocument();
        });

        describe("the quantity modal is open", () => {
          beforeEach(async () => {
            const quantitySelectButton = screen.getByTestId("quantity-modal-button");
            await userEvent.click(quantitySelectButton);
          });

          test("can use the quantity modal option to add values greater than 5", async () => {
            const quantityModal = screen.getByTestId("quantity-modal");
            const quantityInput = within(quantityModal).getByTestId("quantity-input");
            await userEvent.clear(quantityInput);
            await userEvent.type(quantityInput, "6");
            const quantityModalDoneButton = within(quantityModal).getByTestId("modal-confirm-button");
            await userEvent.click(quantityModalDoneButton);
            const cartItemPrice = menuItems[0].price;
            const controlModal = screen.getByTestId("cart-item-control-modal");
            const qq = within(controlModal).getByTestId("menu-item-card-price");
            const menuCardPrice = priceToInt(qq.textContent!);
            assert(menuCardPrice === cartItemPrice * 6);
          });
        });
      });
    });
  });
});
