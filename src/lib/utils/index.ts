import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import useBasket from "../hooks/useBasket";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const intToPrice = (val?: number | string) => (Number(val) * 0.01).toFixed(2) || 0;

export const priceToInt = (val?: number | string) => Math.round(Number(val) * 100) || 0;

export const getTotalCost = () => {
  const {
    restaurant,
    cartItems,
  } = useBasket();
  if (cartItems.length === 0) {
    return 0;
  }
  const totalCartItemsCost = cartItems.map(({ price, quantity }) => price * quantity).reduce((a, b) => a + b, 0);
  const totalWithDelivery = totalCartItemsCost + (restaurant?.deliveryPrice || 0);
  return intToPrice(totalWithDelivery);
};

export const errorCatch = (error: any): string => {
  if (typeof error === "string") {
    return error;
  }
  if (error.response && error.response.data) {
    if (typeof error.response.data.message === "object") {
      return error.response.data.message[0];
    }
    return error.response.data.message;
  }
  return error.message;
};
