import Searchbar, { SearchForm } from "@/components/ui/common/Searchbar";
import { useSearchRestaurants } from "@/lib/api/RestaurantApi";
import { useSearchParams } from "react-router-dom";
import PageControl, { PageControlSkeleton } from "@/components/ui/common/PageControl";
import SearchInfo, { SearchInfoSkeleton } from "./components/SearchInfo";
import SearchResultCard, { SearchResultCardSkeleton } from "./components/SearchResultCard";
import CuisinesFilter from "./components/CuisinesFilter";

export type SearchQuery = { [param: string]: string | undefined; };

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useSearchRestaurants();
  const searchTerm = searchParams.get("searchTerm");
  // retain previously set search params and delete those where empty string
  function handleSetSearchParams(query: SearchQuery) {
    const url = new URLSearchParams(window.location.search);
    const k = Object.keys(query);
    for (let i = 0; i < k.length; i += 1) {
      const prop = k[i];
      if (query[prop] === "") {
        url.delete(prop);
      } else {
        url.set(prop, query[prop]!);
      }
    }
    setSearchParams(url);
  }
  const handleSetSearch = (formData: SearchForm) => {
    handleSetSearchParams({ searchTerm: formData.searchTerm, page: "" });
  };
  const handleSetPage = (num: number) => {
    window.scrollTo({
      top: 0,
    });
    handleSetSearchParams({ page: String(num) });
  };
  const handleResetSearch = () => {
    handleSetSearchParams({ page: "", searchTerm: "" });
  };
  const initialState = isLoading && !data;
  return (
    <main className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <CuisinesFilter
        handleSetSearchParams={(q: SearchQuery) => handleSetSearchParams(q)}
      />
      <div className="flex flex-col gap-4">
        <Searchbar
          placeholder="Find a restaurant"
          onSubmit={handleSetSearch}
          onReset={handleResetSearch}
          searchTerm={searchTerm || undefined}
        />
        {initialState ? (
          <SearchInfoSkeleton />
        ) : null}
        {!data?.pagination ? null : (
          <SearchInfo
            count={data?.pagination?.count}
          />
        )}
        <div className="flex flex-col justify-between flex-1 gap-14">
          <ul className="flex flex-col gap-4">
            {isLoading ? Array(data?.rows.length).fill("").map((_, i) => (
              <SearchResultCardSkeleton key={i} />
            )) : null}
            {data?.rows.map((restaurant) => (
              <li key={restaurant.id}>
                {!data ? null : <SearchResultCard restaurant={restaurant} />}
              </li>
            ))}
          </ul>
          {!data ? null : (
            <PageControl
              page={data?.pagination.page}
              pages={data?.pagination.pages}
              pageLimitReached={data?.pagination.pageLimitReached}
              handleSetPage={handleSetPage}
            />
          )}
          {initialState ? <PageControlSkeleton /> : null}
        </div>
      </div>
    </main>
  );
}

export default SearchPage;
