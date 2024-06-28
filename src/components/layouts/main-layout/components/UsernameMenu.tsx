import { Button } from "@/components/ui/common/shadcn/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/common/shadcn/dropdown-menu";
import { USER_PROFILE_ROUTE } from "@/lib/consts";
import { useAuth0 } from "@auth0/auth0-react";
import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";

function UsernameMenu() {
  const { user, logout } = useAuth0();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center px-3 font-bold hover:text-orange-500 gap-2"
        data-testid="logged-in-menu"
      >
        <CircleUserRound />
        {user?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="p-2" asChild>
          <Link
            className="font-bold cursor-pointer hover:text-orange-500 flex justify-center"
            to={`/${USER_PROFILE_ROUTE}`}
          >
            User Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            className="flex flex-1 font-bold w-full cursor-pointer"
            variant="ghost"
            onClick={() => logout()}
          >
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UsernameMenu;
