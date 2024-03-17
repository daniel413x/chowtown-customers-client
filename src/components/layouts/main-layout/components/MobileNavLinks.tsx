import { Button } from "@/components/ui/common/shadcn/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { USER_PROFILE_ROUTE } from "@/lib/consts";

function MobileNavLinks() {
  const {
    logout,
  } = useAuth0();
  return (
    <>
      <Link
        className="flex bg-white items-center font-bold hover:text-orange-500"
        to={`/${USER_PROFILE_ROUTE}`}
      >
        User Profile
      </Link>
      <Button
        className="flex items-center px-3 font-bold hover:bg-gray-500"
        onClick={() => logout()}
      >
        Logout
      </Button>
    </>
  );
}

export default MobileNavLinks;
