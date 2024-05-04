import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { CartItem, User } from "../types";
import { ORDERS_ROUTE } from "../consts";
import { errorCatch } from "../utils";

type DeliveryDetails = Pick<User, "email" | "name" | "addressLineOne" | "city">;

export type CheckoutSessionRequest = {
  cartItems: CartItem[];
  restaurantSlug: string;
  deliveryDetails: DeliveryDetails;
}

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createCheckoutSessionReq = async (checkoutSessionRequest: CheckoutSessionRequest) => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/${ORDERS_ROUTE}/create-checkout-session`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkoutSessionRequest),
    });
    if (!res.ok) {
      throw new Error("Could not create checkout session");
    }
    return res.json();
  };
  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionReq);
  if (error) {
    toast.error(errorCatch(error));
    reset();
  }
  return {
    createCheckoutSession,
    isLoading,
    error,
    reset,
  };
};
