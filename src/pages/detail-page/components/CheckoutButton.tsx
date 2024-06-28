import LoadingButton from "@/components/ui/common/LoadingButton";
import { Button } from "@/components/ui/common/shadcn/button";
import { CHECKOUT_ROUTE } from "@/lib/consts";
import { useAuth0 } from "@auth0/auth0-react";
import { ShoppingBasket } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function CheckoutButton() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const { pathname } = useLocation();
  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };
  if (!isAuthenticated) {
    return (
      <Button
        className="font-bold text-black hover:text-orange-300 hover:bg-white"
        variant="ghost"
        onClick={handleLogin}
        data-testid="checkout-login-button"
      >
        <ShoppingBasket size={18} className="mr-1" />
        Login and checkout
      </Button>
    );
  }
  if (isLoading) {
    return <LoadingButton />;
  }
  return (
    <Link
      className="flex items-center justify-center text-sm font-bold hover:text-orange-300 hover:bg-white"
      to={`/${CHECKOUT_ROUTE}`}
    >
      <ShoppingBasket size={18} className="mr-1" />
      Go to checkout
    </Link>
  );
}

export default CheckoutButton;
