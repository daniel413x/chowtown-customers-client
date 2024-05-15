import { Button } from "@/components/ui/common/shadcn/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { ORDER_STATUS_ROUTE, USER_PROFILE_ROUTE } from "@/lib/consts";
import {
  Car, UserSquare,
} from "lucide-react";

function MobileNavLinks() {
  const {
    logout,
  } = useAuth0();
  return (
    <>
      <ul className="flex flex-col gap-4 pt-1 pb-8">
        <li>
          <Link
            className="font-bold flex items-center hover:text-orange-500 hover:bg-white gap-2"
            to={`/${ORDER_STATUS_ROUTE}`}
          >
            <Car />
            Orders
          </Link>
        </li>
        <li>
          <Link
            className="font-bold flex items-center hover:text-orange-500 hover:bg-white gap-2"
            to={`/${USER_PROFILE_ROUTE}`}
          >
            <UserSquare />
            User Profile
          </Link>
        </li>
      </ul>
      <Button
        className="flex items-center px-3 font-bold bg-orange-400 text-white"
        onClick={() => logout()}
      >
        Logout
      </Button>
    </>
  );
}

export default MobileNavLinks;
