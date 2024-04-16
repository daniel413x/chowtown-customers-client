import { Label } from "@/components/ui/common/shadcn/label";
import { cn } from "@/lib/utils";
import { Check, XIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchQuery } from "../SearchPage";

interface CuisinesFilterProps {
  handleSetSearchParams: (query: SearchQuery) => void;
}

function CuisinesFilter({
  handleSetSearchParams,
}: CuisinesFilterProps) {
  const [searchParams] = useSearchParams();
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(searchParams.get("cuisines")?.split(",") || []);
  const cuisines = [
    "American",
    "BBQ",
    "Breakfast",
    "Burgers",
    "Cafe",
    "Chinese",
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
        <ul className="space-y-2 flex flex-col">
          {cuisines.map((c) => {
            const isSelected = selectedCuisines.includes(c);
            const id = `cuisine_${c}`;
            return (
              <li key={c}>
                <div className="flex">
                  <input
                    type="checkbox"
                    id={id}
                    className="hidden"
                    value={c}
                    checked={isSelected}
                    onChange={handleCuisineChange}
                  />
                  <Label
                    className={cn("flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold border", {
                      "border-green-600 text-green-600": isSelected,
                      "border-orange-100 text-orange-300": !isSelected,
                    })}
                    htmlFor={id}
                  >
                    {isSelected && <Check className="mr-2" size={16} strokeWidth={3} />}
                    {c}
                  </Label>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default CuisinesFilter;
