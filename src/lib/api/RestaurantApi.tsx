import { useQuery } from "react-query";
import { toast } from "sonner";
import qs from "query-string";
import { errorCatch } from "../utils";
import { RESTAURANT_ROUTE, SEARCH_ROUTE } from "../consts";
import { RestaurantGETManyRes } from "../types";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

export const useSearchRestaurants = (city: string, searchParams: URLSearchParams) => {
  const url = qs.stringifyUrl({
    url: `${API_BASE_URL}/${RESTAURANT_ROUTE}/${SEARCH_ROUTE}/${city}`,
    query: {
      page: searchParams.get("page") || 1,
      searchTerm: searchParams.get("searchTerm"),
      cuisines: searchParams.get("cuisines"),
    },
  }, { skipNull: true });
  const getMyUserReq: () => Promise<RestaurantGETManyRes> = async () => {
    const res = await fetch(url, {
      method: "GET",
    });
    return res.json();
  };
  const { data: fetchedData, isLoading, error } = useQuery(
    [url],
    getMyUserReq,
    {
      enabled: !!city,
      staleTime: 5 * 60 * 1000,
      cacheTime: 15 * 60 * 1000,
    },
  );
  if (error) {
    toast.error(errorCatch(error));
  }
  return {
    data: fetchedData, isLoading,
  };
};
