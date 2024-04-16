import { Skeleton } from "@/components/ui/common/shadcn/skeleton";
import { Link } from "react-router-dom";

interface SearchInfoProps {
  count?: number;
  city?: string;
}

function SearchInfo({
  count,
  city,
}: SearchInfoProps) {
  if (!city) {
    return null;
  }
  const titlecaseCity = city.replace(/(^\D|\s\D)(?=\D*)/g, (c) => c.toUpperCase());
  return (
    <div className="text-xl font-bold flex flex-col gap-3 justify-between my-4 lg:items-center lg:flex-row">
      <span>
        {count}
        {" "}
        restaurants found in
        {" "}
        {titlecaseCity}
        <Link to="/" className="text-sm font-semibold underline cursor-pointer text-blue-500 ml-2">
          Change location
        </Link>
      </span>
    </div>
  );
}

export function SearchInfoSkeleton() {
  return (
    <div
      className="flex items-center gap-2 my-4 h-[28px]"
    >
      <Skeleton className="h-10 w-[300px] mr-2" />
      <Skeleton className="h-6 w-[100px] self-end" />
    </div>
  );
}

export default SearchInfo;
