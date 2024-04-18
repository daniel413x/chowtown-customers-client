import { RESTAURANT_ROUTE, SEARCH_ROUTE } from "@/lib/consts";
import { useParams, useSearchParams } from "react-router-dom";
import qs from "query-string";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

export const useQueryUrl = () => {
  const [searchParams] = useSearchParams();
  const city = useParams().city || "Washington, D.C.";
  const url = qs.stringifyUrl({
    url: `${API_BASE_URL}/${RESTAURANT_ROUTE}/${SEARCH_ROUTE}/${city}`,
    query: {
      page: searchParams.get("page") || 1,
      searchTerm: searchParams.get("searchTerm"),
      cuisines: searchParams.get("cuisines"),
    },
  }, { skipNull: true });
  return url;
};
