/* eslint-disable */

import { Button } from "@/components/ui/common/shadcn/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/common/shadcn/dropdown-menu";
import { Skeleton } from "@/components/ui/common/shadcn/skeleton";

interface SortOptionDropdownProps {
  onChange: (value: string) => void;
  sortOption: string;
}

const sortOptions = [
  {
    label: "Best match",
    value: "bestMatch",
  },
  {
    label: "Lowest delivery price",
    value: "deliveryPrice",
  },
  {
    label: "Lowest delivery time",
    value: "estimatedDeliveryTime",
  },
  {
    label: "Last updated",
    value: "lastUpdated",
  },
];

const SortOptionDropdown = ({
  onChange,
  sortOption,
}: SortOptionDropdownProps) => {
  const label = sortOptions.find(({ value }) => value === sortOption)?.label;
  return (
    <div>
      <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Button variant="outline" className="hover:bg-orange-500 border-2 border-orange-400">
          {`Sort by${sortOption ? `: ${label}` : ''}`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {sortOptions.map((option) => (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => onChange(option.value)}
            key={option.value}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function SortOptionDropdownSkeleton() {
  return (
    <Skeleton className="h-9 w-[82px]" />
  );
}

export default SortOptionDropdown;
  