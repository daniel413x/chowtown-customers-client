import {
  ChevronDown, ChevronUp, XIcon,
} from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchQuery } from "../SearchPage";
import CuisineCheckbox from "./CuisineCheckbox";

interface CuisinesFilterProps {
  handleSetSearchParams: (query: SearchQuery) => void;
}

function CuisinesFilter({
  handleSetSearchParams,
}: CuisinesFilterProps) {
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
          {renderedCuisines.map((a) => a.map((c, i) => (
            <li key={c}>
              <CuisineCheckbox
                index={i}
                key={c}
                cuisine={c}
                isSelected={selectedCuisines.includes(c)}
                onChange={handleCuisineChange}
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
