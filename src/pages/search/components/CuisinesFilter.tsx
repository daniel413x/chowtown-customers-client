import {
  ChevronDown, ChevronUp, XIcon,
} from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useQuery } from "react-query";
import qs from "query-string";
import { SearchQuery } from "../SearchPage";
import CuisineCheckbox from "./CuisineCheckbox";
import { useQueryUrl } from "../hooks/useQueryUrl";

function useObserveQuery(queryKey: string[]) {
  return useQuery(queryKey, { enabled: false });
}

interface CuisinesFilterProps {
  handleSetSearchParams: (query: SearchQuery) => void;
}

function CuisinesFilter({
  handleSetSearchParams,
}: CuisinesFilterProps) {
  const url = useQueryUrl();
  const { status } = useObserveQuery([url]);
  const [urlToCheckSuccess, setUrlToCheckSuccess] = useState<string>("");
  // improve mobile ux; check status emitted by useQuery after a cuisine filter change and display a toast if successful
  useEffect(() => {
    if (url === urlToCheckSuccess) {
      if (status === "success") {
        toast.message("Restaurant list updated!", { position: "bottom-right" });
        setUrlToCheckSuccess("");
      }
    }
  }, [urlToCheckSuccess, status, url]);
  const [searchParams] = useSearchParams();
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(searchParams.get("cuisines")?.split(",") || []);
  const cuisinesPageOne = [
    "American",
    "BBQ",
    "Breakfast",
    "Burgers",
    "Cafe",
    "Chinese",
  ];
  const cuisinesPageTwo = [
    "Desserts",
    "French",
    "Greek",
    "Healthy",
    "Indian",
    "Italian",
    "Japanese",
    "Mexican",
    "Noodles",
    "Organic",
    "Pasta",
    "Pizza",
    "Salads",
    "Seafood",
    "Spanish",
    "Steak",
    "Sushi",
    "Tacos",
    "Tapas",
    "Vegan",
  ];
  const [renderedCuisines, setRenderedCuisines] = useState<string[][]>([cuisinesPageOne]);
  const [expanded, setExpanded] = useState<boolean>(false);
  const handlePressExpand = () => {
    setRenderedCuisines(expanded ? [cuisinesPageOne] : [cuisinesPageOne, cuisinesPageTwo]);
    setExpanded(!expanded);
  };
  const handleCuisineChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const isChecked = e.target.checked;
    const nextSelectedCuisinesArr = isChecked ? [...selectedCuisines, value] : selectedCuisines.filter((c) => c !== value);
    setSelectedCuisines(nextSelectedCuisinesArr);
    const nextSelectedCuisinesStr = nextSelectedCuisinesArr.join(",");
    handleSetSearchParams({ cuisines: nextSelectedCuisinesStr, page: "" });
    setUrlToCheckSuccess(qs.stringifyUrl({ url, query: { cuisines: nextSelectedCuisinesStr } }));
  };
  const isFiltering = selectedCuisines.length > 0;
  const handleReset = () => {
    if (!isFiltering) {
      return;
    }
    setSelectedCuisines([]);
    handleSetSearchParams({ cuisines: "", page: "" });
  };
  return (
    <div className="lg:pt-24">
      <div className="flex justify-between items-center px-4 mb-4">
        <div className="text-md font-semibold text-orange-500">
          Filter by...
        </div>
        {!isFiltering ? null : (
          <button
            className="flex items-center text-md font-semibold cursor-pointer"
            type="button"
            onClick={handleReset}
          >
            <XIcon strokeWidth={3} size={16} className="text-red-400" />
            <span className="text-blue-500 underline">
              Reset
            </span>
          </button>
        )}
      </div>
      <div>
        <ul className="flex flex-col transition-all">
          {renderedCuisines.map((a, groupIndex) => a.map((c, cuisineIndex) => (
            <li key={c}>
              <CuisineCheckbox
                index={cuisineIndex}
                key={c}
                cuisine={c}
                isSelected={selectedCuisines.includes(c)}
                onChange={handleCuisineChange}
                alwaysShow={groupIndex === 0}
              />
            </li>
          )))}
        </ul>
        <button
          className="flex justify-center items-center w-full py-4 mt-0.5 bg-gradient-to-t from-white to-transparent z-10 text-xs uppercase"
          onClick={handlePressExpand}
          type="button"
        >
          {expanded ? <ChevronUp className="mr-1" size={16} strokeWidth={2} /> : <ChevronDown className="mr-1" size={16} strokeWidth={2} />}
          Show
          {` ${expanded ? "less" : "more"}`}
        </button>
      </div>
    </div>
  );
}

export default CuisinesFilter;
