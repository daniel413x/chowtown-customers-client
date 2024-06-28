import { MouseEvent, ReactNode } from "react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/common/shadcn/alert-dialog";
import {
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/common/shadcn/button";
import { useGeolocationToggle } from "../hooks/useGeolocation";

interface ShowDistanceModalProps {
  children: ReactNode;
  onConfirm: () => void;
}

function ShowDistanceModal({
  children,
  onConfirm,
}: ShowDistanceModalProps) {
  const handleConfirm = (e: MouseEvent) => {
    e.stopPropagation();
    onConfirm();
  };
  const {
    active,
  } = useGeolocationToggle();
  return (
    <AlertDialog>
      {active ? children : (
        <AlertDialogTrigger
          onClick={(e) => e.stopPropagation()}
          asChild
        >
          {children}
        </AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Restaurant distance
          </AlertDialogTitle>
          <AlertDialogDescription>
            <MapPin className="m-auto text-orange-500 mb-5" size={30} />
            Grant geolocation permission
            to approximate the location of your device?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button data-testid="remove-modal-confirm-button" onClick={handleConfirm}>
              Yes
            </Button>
          </AlertDialogAction>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()} data-testid="modal-cancel-button">
            No
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ShowDistanceModal;
