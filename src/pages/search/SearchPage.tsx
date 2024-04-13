import Searchbar from "@/components/ui/common/Searchbar";
import { useSearchRestaurants } from "@/lib/api/RestaurantApi";
import { useParams } from "react-router-dom";
import SearchInfo from "./components/SearchInfo";
import SearchResultCard from "./components/SearchResultCard";

function SearchPage() {
  const { city } = useParams();
  const { data } = useSearchRestaurants(city!);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div>
        TODO: filters
      </div>
      <div
        className="results-col"
      >
        <Searchbar
          placeholder="Enter a city"
        />
        <SearchInfo
          city={city}
          count={data?.pagination.count}
        />
        {!data?.rows.length ? <span>No results found</span> : (
          <ul className="flex flex-col gap-4">
            {data.rows.map((restaurant) => (
              <li key={restaurant._id}>
                <SearchResultCard restaurant={restaurant} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
