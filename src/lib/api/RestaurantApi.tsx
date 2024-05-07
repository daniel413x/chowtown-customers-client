import { useQuery } from "react-query";
import { toast } from "sonner";
import { useQueryUrl } from "@/pages/search/hooks/useQueryUrl";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { errorCatch } from "../utils";
import { Restaurant, RestaurantGETManyRes } from "../types";
import { RESTAURANT_ROUTE } from "../consts";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

export const useGetRestaurantById = (id?: string) => {
  const { getAccessTokenSilently } = useAuth0();
  const getRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(
      `${API_BASE_URL}/${RESTAURANT_ROUTE}/by-id/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (!res.ok) {
      throw new Error("Failed to get restaurant");
    }
    const fakeDelay = new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
    const results = await Promise.all([res, fakeDelay]);
    return results[0].json();
  };
  const {
    data: restaurant, isLoading,
  } = useQuery(
    [id],
    getRestaurantRequest,
    {
      enabled: !!id,
    },
  );
  return {
    restaurant, isLoading,
  };
};

export const useGetRestaurant = (slug?: string) => {
  const getRestaurantRequest = async (): Promise<Restaurant> => {
    const res = await fetch(`${API_BASE_URL}/${RESTAURANT_ROUTE}/${slug}`);
    if (!res.ok) {
      throw new Error("Failed to get restaurant");
    }
    return res.json();
  };
  const {
    data: restaurant, isLoading,
  } = useQuery(
    [slug],
    getRestaurantRequest,
    {
      enabled: !!slug,
    },
  );
  return {
    restaurant, isLoading,
  };
};

export const useSearchRestaurants = () => {
  const [currentRowsLength, setCurrentRowsLength] = useState(0);
  const city = useParams().city || "Washington, D.C.";
  const url = useQueryUrl();
  const getRestaurantReq: () => Promise<RestaurantGETManyRes> = async () => {
    const res = await fetch(url, {
      method: "GET",
    });
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
    getRestaurantReq,
    {
      enabled: !!city,
      staleTime: 5 * 60 * 1000,
      cacheTime: 15 * 60 * 1000,
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
    data: fetchedData, isLoading, isFetching, currentRowsLength,
  };
};
