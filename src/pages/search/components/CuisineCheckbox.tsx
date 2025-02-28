import { Label } from "@/components/ui/common/shadcn/label";
import { cn } from "@/lib/utils";
import {
  Check,
} from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

interface CuisineCheckboxProps {
  index: number;
  cuisine: string;
  isSelected: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  alwaysShow?: boolean;
}

function CuisineCheckbox({
  cuisine, isSelected, onChange, index, alwaysShow,
}: CuisineCheckboxProps) {
  const id = `cuisine_${cuisine}`;
  const [show, setShow] = useState<boolean>(alwaysShow || false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 20 * index);
  }, []);
  return (
    <div
      className="flex"
      style={{
        marginTop: show ? "2px" : "0px",
        marginBottom: show ? "2px" : "0px",
        height: show ? "38px" : "0px",
        overflow: "hidden",
        transition: "all linear 0.05s",
      }}
    >
      <input
        type="checkbox"
        id={id}
        className="hidden"
        value={cuisine}
        checked={isSelected}
        onChange={onChange}
      />
      <Label
        className={cn("flex flex-1 items-center cursor-pointer text-sm px-4 py-2 font-semibold border z-0", {
          "border-green-600 text-green-600": isSelected,
          "border-orange-400 text-orange-500": !isSelected,
        })}
        data-testid={`cuisine-checkbox-${cuisine.toLowerCase()}`}
        htmlFor={id}
        tabIndex={0}
      >
        {isSelected && <Check className="mr-2" size={16} strokeWidth={3} />}
        {cuisine}
      </Label>
    </div>
  );
}

export default CuisineCheckbox;
