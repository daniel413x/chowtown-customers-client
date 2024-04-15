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

export default SearchInfo;
