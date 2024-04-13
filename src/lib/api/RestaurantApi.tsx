import { useQuery } from "react-query";
import { toast } from "sonner";
import { errorCatch } from "../utils";
import { RESTAURANT_ROUTE, SEARCH_ROUTE } from "../consts";
import { RestaurantGETManyRes } from "../types";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

export const useSearchRestaurants = (city: string) => {
  const getMyUserReq: () => Promise<RestaurantGETManyRes> = async () => {
    const res = await fetch(`${API_BASE_URL}/${RESTAURANT_ROUTE}/${SEARCH_ROUTE}/${city}`, {
      method: "GET",
    });
    return res.json();
  };
  const { data: fetchedData, isLoading, error } = useQuery(
    ["getRestaurants"],
    getMyUserReq,
    { enabled: !!city },
  );
  if (error) {
    toast.error(errorCatch(error));
  }
  return {
    data: fetchedData, isLoading,
  };
};
