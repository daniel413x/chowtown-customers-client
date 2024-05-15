import { Button } from "@/components/ui/common/shadcn/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { ORDER_STATUS_ROUTE } from "@/lib/consts";
import { Car } from "lucide-react";
import UsernameMenu from "./UsernameMenu";

function MainNav() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <span className="text-black flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
          <Link
            className="font-bold flex items-center hover:text-orange-500  px-3 gap-2"
            to={`/${ORDER_STATUS_ROUTE}`}
          >
            <Car />
            Orders
          </Link>
          <UsernameMenu />
        </>
      ) : (
        <Button
          className="font-bold hover:text-orange-500 hover:bg-white"
          variant="ghost"
          onClick={async () => {
            await loginWithRedirect();
          }}
          data-testid="login-button"
          id="login-button"
        >
          Login
        </Button>
      )}
    </span>
  );
}

export default MainNav;
