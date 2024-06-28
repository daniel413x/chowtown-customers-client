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

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function haversineDistance(
  coordsOne?: [number, number],
  coordsTwo?: [number, number],
): string {
  if (coordsOne?.length !== 2 || coordsTwo?.length !== 2) {
    return "";
  }
  const [lat1, lon1] = coordsOne;
  const [lat2, lon2] = coordsTwo;
  const R = 3959;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2))
    * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = (R * c);
  return distance < 1 ? "< 1" : distance.toFixed(0);
}
