import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import qs from "query-string";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CartItem, OrdersGETManyRes, User } from "../types";
import { ORDERS_ROUTE } from "../consts";
import { errorCatch } from "../utils";

type DeliveryDetails = Pick<User, "email" | "name" | "addressLineOne" | "city">;

export type CheckoutSessionRequest = {
  cartItems: CartItem[];
  restaurantSlug: string;
  deliveryDetails: DeliveryDetails;
}

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

export const useGetUserOrders = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [currentRowsLength, setCurrentRowsLength] = useState(0);
  const [searchParams] = useSearchParams();
  const url = qs.stringifyUrl({
    url: `${API_BASE_URL}/${ORDERS_ROUTE}/user`,
    query: {
      page: searchParams.get("page") || 1,
      sortBy: searchParams.get("sortBy"),
    },
  }, { skipNull: true });
  const getUserOrdersReq: () => Promise<OrdersGETManyRes> = async () => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to get orders");
    }
    const fakeDelay = new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
    const results = await Promise.all([res, fakeDelay]);
    return results[0].json();
  };
  const {
    data: fetchedData, isLoading, isFetching, error,
  } = useQuery(
    [url],
    getUserOrdersReq,
    {
      // enabled: !!city,
    },
  );
  if (error) {
    toast.error(errorCatch(error));
  }
  useEffect(() => {
    if (fetchedData) {
      setCurrentRowsLength(fetchedData.rows.length);
    }
  }, [fetchedData]);
  return {
    orders: fetchedData, isLoading, isFetching, currentRowsLength,
  };
};

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createCheckoutSessionReq = async (
    checkoutSessionRequest: CheckoutSessionRequest,
  ): Promise<{ url: string; }> => {
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
