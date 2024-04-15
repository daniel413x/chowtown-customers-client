import Searchbar, { SearchForm } from "@/components/ui/common/Searchbar";
import { useSearchRestaurants } from "@/lib/api/RestaurantApi";
import { useParams, useSearchParams } from "react-router-dom";
import PageControl, { PageControlSkeleton } from "@/components/ui/common/PageControl";
import SearchInfo from "./components/SearchInfo";
import SearchResultCard, { SearchResultCardSkeleton } from "./components/SearchResultCard";

function SearchPage() {
  const city = useParams().city || "Washington, D.C.";
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useSearchRestaurants(city, searchParams);
  const searchTerm = searchParams.get("searchTerm");
  const handleSetSearch = (formData: SearchForm) => {
    setSearchParams({ searchTerm: formData.searchTerm });
  };
  const handleSetPage = (num: number) => {
    window.scrollTo({
      top: 0,
    });
    const query: any = {
      page: String(num),
    };
    if (searchTerm) {
      query.searchTerm = searchTerm;
    }
    setSearchParams(query);
  };
  return (
    <main className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div>
        TODO: filters
      </div>
      <div className="flex flex-col gap-4">
        <Searchbar
          placeholder="Find a restaurant"
          onSubmit={handleSetSearch}
          searchTerm={searchTerm || undefined}
        />
        <SearchInfo
          city={city}
          count={data?.pagination?.count}
        />
        <div className="flex flex-col justify-between flex-1 gap-8">
          <ul className="flex flex-col gap-4">
            {data?.rows.map((restaurant) => (
              <li key={restaurant.id}>
                {isLoading ? <SearchResultCardSkeleton /> : null}
                {!data ? null : <SearchResultCard restaurant={restaurant} />}
              </li>
            ))}
          </ul>
          {!data ? <PageControlSkeleton /> : (
            <PageControl
              page={data?.pagination.page}
              pages={data?.pagination.pages}
              pageLimitReached={data?.pagination.pageLimitReached}
              handleSetPage={handleSetPage}
            />
          )}
        </div>
      </div>
    </main>
  );
}

export default SearchPage;
