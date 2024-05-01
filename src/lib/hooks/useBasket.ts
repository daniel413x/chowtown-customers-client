import { CartItem, MenuItem, Restaurant } from "@/lib/types";
import { toast } from "sonner";
import { create } from "zustand";

interface BasketModalStore {
  restaurant: Restaurant | undefined;
  cartItems: CartItem[];
  handleAddCartItem: (selectedMenuItem: MenuItem, restaurant: Restaurant) => void;
  handleRemoveFromCart: (selectedMenuItem: MenuItem) => void;
  reset: () => void;
}

export const sessionCartItemsStorageKey = "sessionCartItems";
export const sessionRestaurantStorageKey = "sessionRestaurant";
const storedCartItems = sessionStorage.getItem(sessionCartItemsStorageKey);
const storedRestaurant = sessionStorage.getItem(sessionRestaurantStorageKey);

const useBasket = create<BasketModalStore>((set, get) => ({
  restaurant: storedRestaurant ? JSON.parse(storedRestaurant) : {},
  cartItems: storedCartItems ? JSON.parse(storedCartItems) : [],
  handleAddCartItem: (selectedMenuItem: MenuItem, restaurant: Restaurant) => {
    const nextState: Partial<BasketModalStore> = {};
    const prev = get().cartItems;
    const currentRestaurant = get().restaurant;
    let nextCartItems: CartItem[] = [...prev];
    // enforce items from one restaurant only
    if (currentRestaurant?.restaurantName !== restaurant.restaurantName) {
      nextCartItems = [];
      nextCartItems.push({
        ...selectedMenuItem,
        quantity: 1,
      });
    } else {
      // 1. check if the item is already in the cart
      // 2. if item is in the cart, only update the quantity
      // 3. if item is not in the cart, add it as a new item
      const i = prev.findIndex((cartItem) => cartItem.id === selectedMenuItem.id);
      if (i >= 0) {
        nextCartItems[i] = {
          ...nextCartItems[i],
          quantity: nextCartItems[i].quantity + 1,
        };
      } else {
        nextCartItems.push({
          ...selectedMenuItem,
          quantity: 1,
        });
      }
    }
    nextState.restaurant = restaurant;
    nextState.cartItems = nextCartItems;
    set(nextState);
    sessionStorage.setItem(sessionRestaurantStorageKey, JSON.stringify(restaurant));
    sessionStorage.setItem(sessionCartItemsStorageKey, JSON.stringify(nextCartItems));
    toast.message(`${selectedMenuItem.name} ...added to your cart!`, { position: "bottom-right" });
  },
  handleRemoveFromCart: (selectedMenuItem: MenuItem) => {
    const prev = get().cartItems;
    const nextCartItems = prev.filter((cartItem) => cartItem.id !== selectedMenuItem.id);
    sessionStorage.setItem(sessionCartItemsStorageKey, JSON.stringify(nextCartItems));
    set({ cartItems: nextCartItems });
    toast.message(`${selectedMenuItem.name} ...was removed from your cart`, { position: "bottom-right" });
  },
  reset: () => {
    set({
      restaurant: undefined,
      cartItems: [],
    });
    sessionStorage.clear();
  },
}));

export default useBasket;
