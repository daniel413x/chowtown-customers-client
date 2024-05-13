import { Link } from "react-router-dom";
import logo from "@/assets/logo-standard.png";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

function Header() {
  return (
    <div
      className="border-b-2 border-b-orange-500 py-6 min-w-[83px]"
    >
      <div className="container flex mx-auto justify-between items-center">
        <Link
          className="text-3xl font-bold tracking-light text-orange-500"
          to="/"
        >
          <img
            src={logo}
            alt="Company logo"
          />
        </Link>
        <div className="md:hidden" data-testid="mobile-menu">
          <MobileNav />
        </div>
        <div className="hidden md:block" data-testid="non-mobile-menu">
          <MainNav />
        </div>
      </div>
    </div>
  );
}

export default Header;
