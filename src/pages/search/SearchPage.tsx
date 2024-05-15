import Searchbar, { SearchForm } from "@/components/ui/common/Searchbar";
import { useSearchRestaurants } from "@/lib/api/RestaurantApi";
import { useParams, useSearchParams } from "react-router-dom";
import PageControl, { PageControlSkeleton } from "@/components/ui/common/PageControl";
import Meta from "@/components/misc/Meta";
import SearchInfo, { SearchInfoSkeleton } from "./components/SearchInfo";
import SearchResultCard, { SearchResultCardSkeleton } from "./components/SearchResultCard";
import CuisinesFilter from "./components/CuisinesFilter";
import SortOptionDropdown from "./components/SortOptionDropdown";

export type SearchQuery = { [param: string]: string | undefined; };

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data, isLoading, isFetching, currentRowsLength,
  } = useSearchRestaurants();
  const { city } = useParams();
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
  const handleSetSort = (sortBy: string) => {
    handleSetSearchParams({ sortBy });
  };
  const initialState = isLoading && !data;
  const title = searchTerm ? `"${searchTerm}" in ${city}` : `Search restaurants in ${city}`;
  return (
    <Meta
      title={title}
    >
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
          <div className="flex justify-between items-center gap-3 flex-col lg:flex-row mb-4 lg:mb-0 md:px-8">
            {initialState ? (
              <SearchInfoSkeleton />
            ) : null}
            {!data?.pagination ? null : (
              <SearchInfo
                count={data?.pagination?.count}
              />
            )}
            <SortOptionDropdown
              onChange={handleSetSort}
              sortOption={searchParams.get("sortBy") || ""}
            />
          </div>
          <div className="flex flex-col justify-between flex-1">
            <ul className="flex flex-col gap-8 md:py-4 md:px-8">
              {isLoading || isFetching ? Array(currentRowsLength || 3).fill("").map((_, i) => (
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
    </Meta>
  );
}

export default SearchPage;
