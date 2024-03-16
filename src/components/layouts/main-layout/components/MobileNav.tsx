import { Menu } from "lucide-react";
import { Button } from "@/components/ui/common/shadcn/button";
import {
  Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger,
} from "@/components/ui/common/shadcn/sheet";

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle className="">
          <span className="">
            Welcome to ChowTown!
          </span>
        </SheetTitle>
        <SheetDescription className="flex">
          <Button className="flex-1 font-bold bg-orange-500">
            Log in
          </Button>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
