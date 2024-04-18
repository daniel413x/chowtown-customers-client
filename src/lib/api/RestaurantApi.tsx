import { useQuery } from "react-query";
import { toast } from "sonner";
import { useQueryUrl } from "@/pages/search/hooks/useQueryUrl";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { errorCatch } from "../utils";
import { RestaurantGETManyRes } from "../types";

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
