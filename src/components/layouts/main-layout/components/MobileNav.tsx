import { CircleUserRound, Menu } from "lucide-react";
import { Button } from "@/components/ui/common/shadcn/button";
import {
  Sheet, SheetContent, SheetTitle, SheetTrigger,
} from "@/components/ui/common/shadcn/sheet";
import { useAuth0 } from "@auth0/auth0-react";
import { Separator } from "@/components/ui/common/shadcn/separator";
import MobileNavLinks from "./MobileNavLinks";

function MobileNav() {
  const {
    isAuthenticated,
    loginWithRedirect,
    user,
  } = useAuth0();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {isAuthenticated ? (
            <span className="text-black flex items-center fold-bold gap-2">
              <CircleUserRound />
              {user?.email}
            </span>
          ) : (
            <span>
              Welcome to ChowTown.
            </span>
          )}
        </SheetTitle>
        <Separator />
        <div className="flex flex-col text-black text-sm">
          {isAuthenticated ? <MobileNavLinks /> : (
            <Button
              className="flex-1 font-bold bg-orange-500 mt-4"
              onClick={async () => {
                await loginWithRedirect();
              }}
            >
              Login
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
