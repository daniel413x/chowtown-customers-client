import { Button } from "@/components/ui/common/shadcn/button";
import { MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/common/shadcn/skeleton";
import { cn } from "@/lib/utils";
import { useGeolocationToggle } from "../hooks/useGeolocation";
import ShowDistanceModal from "./ShowDistanceModal";

function ShowDistanceButton() {
  const {
    handleActivateGeolocation,
    active,
  } = useGeolocationToggle();
  return (
    <ShowDistanceModal onConfirm={() => handleActivateGeolocation()}>
      <Button
        className="font-semibold hover:bg-white hover:text-orange-600 group items-end"
        variant="ghost"
        onClick={() => (active ? handleActivateGeolocation() : null)}
      >
        <div className={cn("relative border-2 p-2.5 mr-1 group-hover:border-orange-500", {
          "bg-orange-100": active,
        })}
        >
          <MapPin
            size={22}
            strokeWidth={2.25}
            fill="white"
            className={cn("text-orange-500/20 absolute top-1.5 left-1/2 -translate-x-1/2 -translate-y-1/2 mr-0.5", {
              "text-orange-500": active,
            })}
          />
        </div>
        {" "}
        Show distance
      </Button>
    </ShowDistanceModal>
  );
}

export function ShowDistanceButtonSkeleton() {
  return (
    <div
      className="flex items-center gap-1 px-4"
    >
      <Skeleton className="h-5 w-5" />
      <Skeleton className="h-4 w-24" />
    </div>
  );
}

export default ShowDistanceButton;
